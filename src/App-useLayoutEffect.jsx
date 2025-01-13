import { useState, useLayoutEffect } from 'react'

function App() {
  console.log('app')
  const [input, setInput] = useState('')
  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  })
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)}></input>
    </div>
  )
}

export default App
