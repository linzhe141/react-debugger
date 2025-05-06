import { useState, memo, useEffect } from 'react'

function Wrapper() {
  console.error('Wrapper')
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

function App() {
  console.error('app')
  return <Wrapper />
}

function PureComp() {
  console.error('PureComp')
  useEffect(() => {
    console.error('PureComp useEffect')
  })
  return <div>PureComp~</div>
}
export default App
