# react-debugger[18.3.1]

[源码大致流程](./readme.svg)

## 一些调试相关的修改

### 修改 node_modules/react-dom/cjs/react-dom.development.js 代码

```js
function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;

  if (workInProgress === null) {
    ....
    workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode);
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    //! 新增下面 1 行调试代码
    //! 注释 对应的 Object.preventExtensions(this);
    workInProgress.aaa_isCopy = true
    ...
  }
  ...
}

```

### 修改 node_modules/@vitejs/plugin-react/dist/index.mjs 代码

将`skipFastRefresh`相关代码改成true，最新版本的`@vitejs/plugin-react`没有fastRefresh的配置开关了，调试react流程时，不需要这个(hmr)配置，降低debuger复杂度

## complete

- `HostComponent`

  ```js
  var instance = createInstance(
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress,
  )
  appendAllChildren(instance, workInProgress, false, false)
  workInProgress.stateNode = instance
  bubbleProperties(workInProgress)
  return null
  ```

- `FunctionComponent、MemoComponent、Fragment`

  ```js
  bubbleProperties(workInProgress)
  return null
  ```

- `HostRoot`

  ```js
  var fiberRoot = workInProgress.stateNode
  updateHostContainer(current, workInProgress)
  bubbleProperties(workInProgress)
  return null
  ```

## https://www.xiabingbao.com/post/react/react-process-update-queue-riewir.html

## [setState 从react18起都是批处理调度了](https://github.com/reactwg/react-18/discussions/21)

What if I don’t want to batch?

```js
import { flushSync } from 'react-dom' // Note: react-dom, not react

function handleClick() {
  flushSync(() => {
    setCounter((c) => c + 1)
  })
  // React has updated the DOM by now
  flushSync(() => {
    setFlag((f) => !f)
  })
  // React has updated the DOM by now
}
```

## renderWithHooks

就是构建hook链表，fiber.memoizedState -> hook链表

## debugger setState

```js
__setCount(__count + 1)
__setCount(__count + 2)
__setCount(__count + 3)
__setNum(__num + 1)
__setNum(__num + 2)
__setNum(__num + 3)
```

`setState`后，会给当前的fiber的lanes打算标签，比如`sync`，然后再beginwork中找到这个打算标签的fiber，然后重新执行函数组件

`enqueueConcurrentHookUpdate`函数会将对应hook的`update`构造一个环形链表，并且对应的queue的interleaved指向最后一个更新，既`__setCount(__count + 3)`或者`__setNum(__num + 3)`

构造完成之后就会调度更新`performConcurrentWorkOnRoot`，并且`finishQueueingConcurrentUpdates`函数中，将queue的pending指向interleaved的update链表（源码的注释写的很清楚）

updateState[useState(0)]->updateWorkInProgressHook

从currentFiber[App Fiber]copy 一份 `新的hook`链表，hook对象是新的，但是hook的queue还是同一个，上面可以知道queue.pending 就是指向`__setCount(__count + 3)`的环形链表

updateReducer 遍历环形链表，得到最新的state到hook.memoizedState，并且pending变成null表示完成了，暂时不考虑优先级不同导致可中断情况

### 关于lane比较重要的断点

- `markUpdateLaneFromFiberToRoot`

  ```js
  function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
    debugger
    // Update the source fiber's lanes
    sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane)
    ....
  }
  ```

- `markRootUpdated`
  ```js
  function markRootUpdated(root, updateLane, eventTime) {
    debugger
    root.pendingLanes |= updateLane
    ....
  }
  ```
- `prepareFreshStack`
  ```js
  debugger
  workInProgressRootRenderLanes =
    subtreeRenderLanes =
    workInProgressRootIncludedLanes =
      lanes
  ```
- `beginWork` 组件更新 最重要
  ```js
  debugger
  // 默认情况下，当一个组件重新执行时，其子组件也会重新执行，
  // 所以子组件jsx由于会重新执行那么他的props怎么都是一个新的对象，
  // 即使是memo包裹这个组件，那么他的jsx props 也是新的对象，只是因为他的浅比较，有机会跳过更新而已

  // 如果父组件没有重新执行，那么在beginwork中，会直接`cloneChildFibers，好像在就进行一clone`其子fiber，所以oldProps === newProps
  // 所以子组件会在 `oldProps !== newProps || hasContextChanged()`，或者当前的函数组件fiber包含了正在调度的renderLanes时，就进行重新执行更新
  // 组件进行了更新
  if (
    oldProps !== newProps ||
    hasContextChanged() || // Force a re-render if the implementation changed due to hot reload:
    workInProgress.type !== current.type
  ) {
    // If props or context changed, mark the fiber as having performed work.
    // This may be unset if the props are determined to be equal later (memo).
    didReceiveUpdate = true
  } else {
    // 如果当前的fiber 包含了 renderLanes 表示需要更新
    var hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(
      current,
      renderLanes,
    )
  }
  ```

### TODO

- fiber.updateQueue ? 什么用？

- delete the effect list.
  https://github.com/facebook/react/pull/20622
