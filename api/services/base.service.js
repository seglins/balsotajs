module.exports = (Model) => ({
  async getOne(filter, populate) {
    try {
      if (typeof filter !== 'object')
        return await Model.findById(filter).populate(populate)
      return await Model.findOne(filter).populate(populate)
    } catch (error) {
      throw error
    }
  },
  async get(filter, populate) {
    try {
      return await Model.find(filter ? filter : {}).populate(populate)
    } catch (error) {
      throw error
    }
  },
  async getCount(filter) {
    try {
      return await Model.countDocuments(filter ? filter : {})
    } catch (error) {
      throw error
    }
  },
  async createOne(data) {
    try {
      const instance = new Model(data)
      return await instance.save()
    } catch (error) {
      throw error
    }
  },
  async createMany(data) {
    try {
      return await Model.insertMany(data)
    } catch (error) {
      throw error
    }
  },
  async updateOne(id, data) {
    try {
      const options = { runValidators: true, new: true, context: 'query' }
      return await Model.findByIdAndUpdate(id, data, options)
    } catch (error) {
      throw error
    }
  },
  async deleteOne(id) {
    try {
      return await Model.findByIdAndDelete(id)
    } catch (error) {
      throw error
    }
  },
  async deleteMany(filter) {
    try {
      return await Model.deleteMany(filter ? filter : {})
    } catch (error) {
      throw error
    }
  },
})
