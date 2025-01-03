import { useState, memo, useEffect } from 'react'

function App() {
  debugger
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(100)
  window.__count = count
  window.__setCount = setCount
  window.__num = num
  window.__setNum = setNum
  debugger
  useEffect(() => {
    debugger
    console.log('useEffect')
  })
  return (
    <div>
      <span>
        {count}
        {num}
      </span>
      {/* <MemoComp></MemoComp> */}
      <Comp num={123}></Comp>
    </div>
  )
}

function Comp(props) {
  debugger
  useEffect(() => {
    debugger
    return () => {
      debugger
    }
  }, [props.num])
  return <p>Comp{props.num}</p>
}
debugger
const MemoComp = memo(function PureComp() {
  debugger
  return 'PureComp~'
})

export default App
