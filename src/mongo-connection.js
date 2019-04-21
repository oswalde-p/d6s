const mongoose = require('mongoose')
const config = require('./config')

const mongooseConnectionString = config.MONGO_CONNECTION_STRING

module.exports = mongoose.connect(mongooseConnectionString, {useNewUrlParser: true},  err => {
  if (err) {
    console.log('Error connecting to mongodb')
    console.log(`String: ${mongooseConnectionString}`)
    console.error(err)
  } else {
    console.log('Mongo connection successful')
  }
})
