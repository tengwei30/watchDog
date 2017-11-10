const assert = require('http-assert')
const moment = require('moment')
require('moment/locale/zh-cn')
const RoomStatus = require('../model/roomStatus')


async function createRoomStatus(ctx) {
  let roomStatusBody = ctx.request.body
  // 数据监测
  assert(roomStatusBody.user, 400, '请填写房间的使用人')
  assert(roomStatusBody.room, 400, '请填写有效的房间Id')
  assert(roomStatusBody.desc, 400, '请填写房间使用目的')
  assert(roomStatusBody.during, 400, '请填写使用时长')
  assert(roomStatusBody.startTime, 400, '请填写开始占用的时间')
  assert(roomStatusBody.order, 400, '需要有预订者')
  
  // 计算、初始化基本数据
  const todayBeginString = `${moment().format().split('T')[0]}T00:00:00`
  const todayBeginTime = +moment(todayBeginString).format('x')
  const workBeginTime = todayBeginTime + 36000000 // 3600 * 10 * 1000 // 最早时间设定为10点
  const todayWeekDay = +moment().days() || 7 // 周日改为第七天
  const gap = 1800000 // 30 * 60 * 1000
  let todayTimeBlocks = createOneDayTimeBlocks(workBeginTime, gap)
  const begin = ctx.request.body.baseline
  const end = ctx.request.body.baseline + 86400000 // 24 * 3600 * 1000
  const roomStatus = await RoomStatus.find({ room: roomStatusBody.room, startTime: { $gte: begin, $lte: end } })
  todayTimeBlocks = fillTodayTimeBlocks(roomStatus, todayTimeBlocks)
  
  const result = findTimeConflict(todayTimeBlocks, ctx.request.body)
  
  if (typeof result === 'number') {
    return ctx.body = { message: `时间冲突了！第${result + 1}个时间块` }
  }

  roomStatusBody = new RoomStatus(roomStatusBody)
  await roomStatusBody.save()
  todayTimeBlocks = fillTodayTimeBlocks([roomStatusBody], todayTimeBlocks)
  global.io.broadcast('hello', todayTimeBlocks)
  ctx.body = todayTimeBlocks
}


async function getAll(ctx) {
  console.log(ctx.query)
  // 会议室接受预定的最早时间为 从当天 0点 向后推 n 个小时
  const todayBeginString = `${moment().format().split('T')[0]}T00:00:00`
  const todayBeginTime = +moment(todayBeginString).format('x')
  const todayWeekDay = +moment().days() || 7 // 周日改为第七天
  const outerArray = createTwoWeeksTimeBlock()
  const begin = todayBeginTime - 86400000/* 3600 * 24 * 1000 */ * (todayWeekDay - 1)
  const end = todayBeginTime + 1123200000 // 3600 * 24 * 1000 * (14 - 1)
  const roomStatus = await RoomStatus.find({ room: ctx.query.roomId, startTime: { $gte: begin, $lte: end } })
  console.log(roomStatus)
  for(let i = 0; i < roomStatus.length; i++) {
    for(let m = 0; m < 14; m++) {
      for (let j = 0; j < 18; j ++) {
        if (roomStatus[i].startTime === outerArray[m][j].startTime) {
          outerArray[m][j].used = true
          outerArray[m][j].user = roomStatus[i].user
          outerArray[m][j].during = roomStatus[i].during
          outerArray[m][j].desc = roomStatus[i].desc
          console.log(m)
          for (let n = 0; n < roomStatus[i].during/1800000; n++) {
            outerArray[m][j + n].used = true
          }
          break
        }
      }
    }    
  }
  ctx.body = outerArray
}

function createTwoWeeksTimeBlock() {
  // 会议室接受预定的最早时间为 从当天 0点 向后推 n 个小时
  const todayBeginString = `${moment().format().split('T')[0]}T00:00:00`
  const todayBeginTime = +moment(todayBeginString).format('x')
  const workBeginTime = todayBeginTime + 36000000 // 3600 * 10 * 1000 最早时间设定为10点
  const todayWeekDay = +moment().days() || 7 // 周日改为第七天
  const gap = 1800000 // 30 * 60 * 1000
  const outerArray = []
  for(let j = 0; j < 14; j++) {
    const everyDayBeginTime = todayBeginTime + (j - (todayWeekDay - 1)) * 86400000 // 3600 * 24 * 1000
    const array = createOneDayTimeBlocks(everyDayBeginTime + 36000000, gap)
    outerArray.push(array)
  }

  return outerArray
}

function createOneDayTimeBlocks(workBeginTime, gap) {
  const array = []
  for(let i = 0; i < 18; i++) {
    array.push({
      startTime: workBeginTime + (gap * i),
      during: gap,
      used: false
    })
  }
  return array
}

function fillTodayTimeBlocks(orders, todayTimeBlocks) {
  for (let i = 0, j = orders.length; i < j; i++) {
    for (let m = 0, n = todayTimeBlocks.length; m < n; m++) {
      if (todayTimeBlocks[m].startTime === orders[i].startTime) {
        todayTimeBlocks[m].used = true
        for(let x = 0; x < orders[i].during/1800000; ++x) {
          todayTimeBlocks[m + x].used = true
          todayTimeBlocks[m + x].desc = orders[i].desc
          todayTimeBlocks[m + x].user = orders[i].user
          todayTimeBlocks[m + x].order = orders[i].order
        }
        break
      }
    }
  }
  return todayTimeBlocks
}

function findTimeConflict(todayTimeBlocks, body) {
  for (let i = 0, j = todayTimeBlocks.length; i < j; i++) {
    if (todayTimeBlocks[i].startTime === body.startTime && todayTimeBlocks[i].used) {
      return i
    }    
  }
  return null
}

async function removeStatus(ctx) {
  await RoomStatus.remove({ startTime: +ctx.query.startTime })
  ctx.body = 'success'
}

module.exports = {
  getAll,
  createRoomStatus,
  removeStatus
}