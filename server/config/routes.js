const router = require('koa-router')()
const userCtl = require('../controller/user')
const roomCtl = require('../controller/room')
const roomStatusCtl = require('../controller/roomStatus')
const path = require('path')
const formidable = require('formidable')
const fs = require('fs')
const moment = require('moment')
require('moment/locale/zh-cn')

router.get('/', ctx => {
  ctx.body = 'success'
  console.log(`${moment().format().split('T')[0]}T00:00:00`)
  console.log(moment('2017-04-23T00:00:00').days())
})

router.get('/me', async ctx => await userCtl.getMe(ctx))

router.post('/signup', async ctx => userCtl.createUser(ctx))

router.post('/room', async ctx => roomCtl.createRoom(ctx))

router.get('/rooms', async ctx => roomCtl.getAll(ctx))

router.post('/roomstatus', async ctx => roomStatusCtl.createRoomStatus(ctx))

router.get('/roomStatus', async ctx => roomStatusCtl.getAll(ctx))

router.delete('/roomStatus', async ctx => roomStatusCtl.removeStatus(ctx))

router.post('/currentState', async ctx => {
  global.io.broadcast('hello', ctx.request.body)
  ctx.body = ctx.request.body
})

module.exports = router.routes()
