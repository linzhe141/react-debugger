import { useState, useEffect } from 'react'
// https://overreacted.io/before-you-memo/
function Test() {
  console.log('Test')
  const [input, setInput] = useState('')
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)}></input>
    </div>
  )
}

function App() {
  console.log('App')
  return (
    <div>
      <Test></Test>
      <PureComp></PureComp>
    </div>
  )
}
function PureComp() {
  console.log('PureComp')
  return <div>PureComp~</div>
}
export default App
