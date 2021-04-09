const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator')

const schema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required']
  },
  birthYear: {
    type: Number,
    required: [true, 'Birth year is required'],
    min: 1900
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: [true, 'Region is required']
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Party',
    required: [true, 'Party is required']
  },
  ip: {
    type: String
  },
  created: {
    type: Date,
    immutable: true,
    default: Date.now
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

schema.plugin(idValidator)

module.exports = mongoose.model('Vote', schema)