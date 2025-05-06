import { useState, memo, useEffect } from 'react'

function Wrapper() {
  console.error('Wrapper')
  const [input, setInput] = useState('')
  const node = (
    <div>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      ></input>
      <PureCompMemo name="1"></PureCompMemo>
    </div>
  )
  return node
}

function App() {
  console.error('app')
  return <Wrapper />
}
function PureComp(props) {
  console.error('PureComp')
  useEffect(() => {
    console.error('PureComp useEffect')
  })
  return <div>PureComp~</div>
}

const PureCompMemo = memo(function PureComp(props) {
  console.error('PureComp')
  useEffect(() => {
    console.error('PureComp useEffect')
  })
  return <div>PureComp~</div>
})
export default App
