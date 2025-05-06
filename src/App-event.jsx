// dispatchEventForPluginEventSystem 重要函数
// dispatchEventsForPlugins 重要函数
// var SyntheticEventCtor = SyntheticEvent;  重要源码
function App() {
  return (
    <div>
      <div
        onClick={(e) => {
          console.log(e)
          console.log('click')
        }}
      >
        click this~!
      </div>
    </div>
  )
}

export default App
