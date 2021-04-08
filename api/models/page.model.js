const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const slug = require('../helpers/slug')
const sanitize = require('../helpers/sanitize')

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  slug: {
    type: String,
    unique: true,
    required: [true, 'Slug is required'],
  },
  created: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
  content: {
    type: String,
    default: '',
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  displayInMenu: {
    type: String,
    default: 'header',
    enum: ['header', 'footer'],
  },
  isAboutPage: {
    type: Boolean,
    default: false,
  },
})

pageSchema.pre('validate', function (next) {
  if (this.content) this.content = sanitize(this.content)
  if (this.title) {
    this.title = sanitize(this.title)
    this.slug = slug(this.title)
  }
  next()
})

pageSchema.pre('findOneAndUpdate', function (next) {
  if (!this._update) next()

  if (this._update.content)
    this._update.content = sanitize(this._update.content)

  if (this._update.title) {
    this._update.title = sanitize(this._update.title)
    this._update.slug = slug(this._update.title)
  }
  next()
})

pageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

pageSchema.plugin(uniqueValidator, { message: 'Page already exists' })

module.exports = mongoose.model('Page', pageSchema)
