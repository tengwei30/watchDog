const Room = require('../model/room')
const assert = require('http-assert')

async function createRoom(ctx) {
  let roomBody = ctx.request.body
  assert(roomBody.name, 400, '请填写房间名称')
  assert((roomBody.capacity) && (typeof roomBody.capacity === 'number'), 400, '请填写正确的房间容量')
  roomBody = new Room(roomBody)
  try {
    await roomBody.save()
  } catch(err) {
    assert(false, 400, '请填正确的房间参数')
  }
  ctx.body = roomBody
}

async function getAll(ctx) {
  const rooms = await Room.find({})
  ctx.body = rooms
}

module.exports = {
  createRoom,
  getAll
}