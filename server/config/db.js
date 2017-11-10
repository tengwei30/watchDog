const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const db = mongoose.connection
mongoose.connect('mongodb://10.8.8.8/watchdog')
db.on('error', () => {
  console.log('db connect error')
})

db.on('open', () => {
  console.log('db open success')
})

db.on('connected', () => {
    console.info('db connected success')
})

db.on('disconnected', () => {
    console.error('Database disconnected')
    console.info('Exit process')
    process.exit(1)
})

process.on('SIGINT', () => {
    console.warn('app exit')
    if (db.readyState === 1) {
        db.close()
    } else {
        process.exit(0)
    }
})