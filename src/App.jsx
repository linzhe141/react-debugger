import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  window.__setCount = setCount
  return (
    <div>
      <span>{count}</span>
    </div>
  )
}

export default App
