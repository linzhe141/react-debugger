import { useState } from 'react'

function App() {
  debugger
  const [num, setNum] = useState(100)
  window.__num = num
  window.__setNum = setNum
  return (
    <div>
      <span>{num}</span>
    </div>
  )
}
setTimeout(() => {
  /* 批处理 */
  debugger
  // 会有三次更新update构成的循环队列,
  // 并且这个hook的queue.interleaved = update // 最后一个更新__setNum(__num + 3)
  // 在beginwork前的prepareFreshStack-->finishQueueingConcurrentUpdates的更新queue.pending -> lastInterleavedUpdate

  // 在updateState中,遍历这个循环链表获取最新的state既103
  __setNum(__num + 1)
  __setNum(__num + 2)
  __setNum(__num + 3)
}, 3000)
export default App
