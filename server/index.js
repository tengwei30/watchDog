const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const IO = require('koa-socket')
const cors = require('koa2-cors')
require('./config/db')
const app = new Koa()
app.use(cors({exposeHeaders: ['userid'], maxAge: 3600}))
app.use(async function(ctx, next) {
  console.log(ctx.headers.userid)
  ctx.userid = ctx.headers.userid
  await next()
  if (ctx.headers.userid && !ctx.newuserid) {
    ctx.set('userid', ctx.headers.userid)
  }
})
require('./config/socketio')(app)
app.use(bodyParser())
app.use(require('./config/routes'))

app.listen(3000)
