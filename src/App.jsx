import { useEffect } from 'react'
import { useState } from 'react'

function App() {
  debugger
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(100)
  window.__count = count
  window.__setCount = setCount
  window.__num = num
  window.__setNum = setNum
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
    </div>
  )
}

export default App
