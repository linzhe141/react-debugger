```js
updateHostComponent$1 = function () {
  workInProgress.updateQueue = updatePayload
}
```

completedWork -> bubbleProperties 合并 flags, 优先级 ?

completedWork 所有节点后

```js
workInProgressRootExitStatus = RootCompleted
```

开始commit阶段
commitRoot


https://juejin.cn/post/7199254597915181117