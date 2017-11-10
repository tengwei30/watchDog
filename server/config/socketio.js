const IO = require('koa-socket')

function initIo(koaApp) {
  const io = new IO()
  io.attach(koaApp)
  io.on('connection', (ctx, data) => {
    console.log('connect')
    console.log( 'join event fired', data )
    io.broadcast('hello', 234)
  })
  io.on('received', (ctx, data) => {
    console.log(ctx.data)
    io.broadcast('hello', 234)
  })
  global.io = io
}

module.exports = initIo
