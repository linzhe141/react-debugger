import { useState, useEffect } from 'react'

// https://github.com/lihongxun945/myblog/issues/47 useEffect 闭包
function App() {
  const [count, setCount] = useState(0)
  const update = () => {
    setCount(count + 1)
  }
  useEffect(function autoCount() {
    console.log('zzzzzzzz')
    // 取个名字方便讲解
    const interval = setInterval(function repeat() {
      // 取个名字方便讲解
      console.log('yyy', repeat)
      debugger
      setCount(count + 1) // 也可以写成update(),效果是一样的
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="App">
      <span>COUNT: {count}</span> <button onClick={update}>+</button>
    </div>
  )
}

export default App
