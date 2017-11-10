const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  nickname: String,
  email: { type: String, unique: true }
})

const User = mongoose.model('User', userSchema)

module.exports = mongoose.model('User')
