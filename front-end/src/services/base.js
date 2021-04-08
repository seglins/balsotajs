import axios from 'axios'

const service = (resource) => {
  const url = `${process.env.REACT_APP_API_URL}/${resource}`

  return {
    async get () {
      const response = await axios.get(url)
      return response.data
    },
    async post (data) {
      const response = await axios.post(url, data)
      return response.data
    },
  }
}

export default service