import { useState, useEffect } from 'react'

function App() {
  debugger
  const [num, setNum] = useState(100)
  window.__num = num
  window.__setNum = setNum
  debugger
  useEffect(() => {
    debugger
    console.log('useEffect')
  })
  return (
    <div>
      <span>{num}</span>
      <Comp num={num}></Comp>
      <Comp zz={123}></Comp>
    </div>
  )
}

function Comp(props) {
  debugger
  useEffect(() => {
    debugger
    props
    return () => {
      debugger
      // 这里时旧的props?
      props
    }
  }, [props.num])
  return (
    <p>
      <span>{props.num}</span>
      <span>{props.zz}</span>
    </p>
  )
}
export default App
