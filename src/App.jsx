import { useState, memo, useEffect } from 'react'

function App() {
  console.log('app')
  const [input, setInput] = useState('')
  return (
    <div>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      ></input>
      <PureComp></PureComp>
    </div>
  )
}

function PureComp() {
  console.log('PureComp')
  useEffect(() => {
    console.log('PureComp useEffect')
  })
  return <div>PureComp~</div>
}
export default App
