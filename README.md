# react-debugger

## 修改 node_modules/react-dom/cjs/react-dom.development.js 代码

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

## 修改 node_modules/@vitejs/plugin-react/dist/index.mjs 代码

将`skipFastRefresh`相关代码改成true，最新版本的`@vitejs/plugin-react`没有fastRefresh的配置开关了，调试react流程时，不需要这个(hmr)配置，降低debuger复杂度


##　https://www.xiabingbao.com/post/react/react-process-update-queue-riewir.html