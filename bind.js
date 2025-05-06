// react 源码中有很多这种写法
function foo(x, y, z) {
  console.log(x)
  console.log(y)
  console.log(z)
}

const bar = foo.bind(null, 'xxx','yyy')
bar('zzzz')