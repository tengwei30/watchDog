const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const roomStatusSchema = mongoose.Schema({
  user: String,
  order: { type: ObjectId, ref: 'User' },
  room: { type: ObjectId, ref: 'Room' },
  startTime: Number,
  during: Number,
  desc: String
})

const RoomStatus = mongoose.model('RoomStatus', roomStatusSchema)

module.exports = mongoose.model('RoomStatus')
