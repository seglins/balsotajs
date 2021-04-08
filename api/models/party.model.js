const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const idValidator = require('mongoose-id-validator')
const sanitizeHtml = require('sanitize-html')
const slug = require('../helpers/slug')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  slug: {
    type: String,
    unique: true,
    required: [true, 'Slug is required']
  },
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote',
  }],
  events: {
    type: [{ type: String }],
    default: []
  },
  created: {
    type: Date,
    immutable: true,
    default: Date.now
  },
  color: {
    type: String,
    default: '#58b2f6'
  }
})

schema.pre('validate', function (next) {
  if (this.name) {
    this.name = sanitizeHtml(this.name)
    this.slug = slug(this.name)
  }
  next()
})

schema.pre('findOneAndUpdate', function(next) {
  if (!this._update) next()
  
  if (this._update.name) {
    this._update.name = sanitizeHtml(this._update.name)
    this._update.slug = slug(this._update.name)
  }
  next()
})


schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // delete returnedObject.votes
    delete returnedObject._id
    delete returnedObject.__v
  }
})

schema.plugin(uniqueValidator, { message: 'Party already exists' })
schema.plugin(idValidator)

module.exports = mongoose.model('Party', schema)