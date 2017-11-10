const mongoose = require('mongoose')
const roomSchema = mongoose.Schema({
  name: String,
  devices: [String],
  desc: String,
  capacity: Number,
  type: String,
  position: String,
  image: String
})

const Room = mongoose.model('Room', roomSchema)

module.exports = mongoose.model('Room')
