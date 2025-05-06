import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import App from './App-memo.jsx'
import App from './App-event.jsx'
// import App from './App-before-you-memo.jsx'
// import App from './App-repeating-setState.jsx'
// import App from './App-useLayoutEffect'
import './visualizeFlags.js'
const root = createRoot(document.getElementById('root'))
debugger
root.render(<App />)
