const User = require('../model/user')
const assert = require('http-assert')
const regexp = require('../config/regexp')

async function createUser(ctx) {
  const userBody = ctx.request.body
  assert(userBody.email, 400, 'should have email')
  assert(regexp.email.exec(userBody.email), 400, '邮箱格式不正确')
  console.log(userBody.email)
  let user = await User.findOne({ email: userBody.email })
  console.log(user)
  if (!user) {
    user = new User(userBody)
    console.log(user)
    try {
      await user.save()
    } catch (err) {
      console.log(err)
      err.errmsg.match('duplicate') ? assert(false, 400, '已有重名用户') : assert(false, 400, '服务器开小差了')
    }
  }

  ctx.set('userid', user._id)
  ctx.newuserid = true
  ctx.body = user
}

async function updateUser(ctx) {
  assert(typeof ctx.request.body === 'object', 400, '格式不正确')
  const { nickname, email } = ctx.request.body
  const userIncrement = {}
  if (nickname) userIncrement.nickname = nickname
  if (email) userIncrement.email = email
  
}

async function getMe(ctx) {
  console.log(ctx.userid)
  assert(ctx.userid, 400, '用户身份无效，请重新登录')
  let user = {}
  try {
    user = await User.findOne({ _id: ctx.userid })
  } catch(err) {
    assert(false, 400, '用户身份无效，请重新登录')
  }
  if (!user) {
    console.log('用户身份无效，请重新登录')
    assert(false, 400, '用户身份无效，请重新登录')
  } else {
    ctx.body = user
  }
}

module.exports = {
  createUser,
  getMe
}
