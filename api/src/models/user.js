const mongoose = require('mongoose')
const Entry = require('./entry')

const UserSchema = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  history: [{type:mongoose.Schema.Types.ObjectId, ref: 'Entry'}]
})

UserSchema.methods.updateHistory = async function(email, entries, update=false) {
  if (!email){
    throw new Error('Missing user email')
  }
  await entries.forEach( async (entry) => {
    if(entry._id) {
      const existingEntry = await Entry.findById(entry._id)
      if (!existingEntry) throw new Error('Invalid user/entry combination')
      const {time, value} = entry
      existingEntry.time = time
      existingEntry.value = value
      await existingEntry.save()
    } else {
      const newEntry = new Entry(entry)
      await newEntry.save()
      this.history.push(newEntry)
      await this.save()
    }
  })
}

module.exports = mongoose.model('User', UserSchema)
