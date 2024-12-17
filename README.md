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
    //! 新增下面 2 行调试代码，用于debugger第一次渲染
    //! 注释 对应的 Object.preventExtensions(this);
    workInProgress.aaa_isCopyHostRoot = true
    window.__CopyHostRoot = workInProgress
    ...
  }
  ...
}

```
