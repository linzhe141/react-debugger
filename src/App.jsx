import { useState } from 'react'

function App() {
  debugger
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(100)
  window.__setCount = setCount
  window.__setNum = setNum
  return (
    <div>
      <span>
        {count}
        {num}
      </span>
    </div>
  )
}

export default App
