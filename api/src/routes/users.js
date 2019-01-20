const router = require('express').Router()
const User = require('../models/user')
const Entry = require('../models/entry')
const { timeComparatorNewestFirst } = require('../helpers')

//TODO add authorisation to appropriate functions

router.get('/', async function(req, res) {
  const users = await User.find()
  res.send(users)
})

router.post('/history/', async function(req, res) {
  const {email} = req.body
  if (email) {
    const user = await User.findOne({email}).populate('history').exec()
    if (user){
      let history = user.history
      history.sort(timeComparatorNewestFirst)
      return res.send(user.history)
    } else {
      return res.status(400).send('User not found')
    }
  }
  res.send(400)
})

router.post('/history/update/', async function(req, res){
  const { email, data} = req.body
  console.log(data)
  try {
    const user = await User.findOne({email}).populate('history').exec()
    await user.updateHistory(email, data)
    res.send(user.history)
  } catch(err) {
    console.error(err)
    res.send(400)
  }
})

module.exports = router
