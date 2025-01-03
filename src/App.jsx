import { useState, useEffect } from 'react'

function App() {
  const [num, setNum] = useState(100)
  window.__setNum = setNum
  return <Comp num={num}></Comp>
}

function Comp(props) {
  debugger
  useEffect(() => {
    debugger
    props // {num:1000}
    return () => {
      debugger
      // 为什么这里是旧的 props? {num:100}  从chrome的调试工具看，就是来源闭包
      props 
    }
  }, [props.num])
  return (
    <p>
      <span>{props.num}</span>
    </p>
  )
}

setTimeout(() => {
  __setNum(1000)
}, 1000)
export default App
