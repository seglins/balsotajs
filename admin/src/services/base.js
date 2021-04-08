import axios from 'axios'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `bearer ${token}`
  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

const service = (resource) => {
  const url = `${process.env.REACT_APP_API_URL}/${resource}`

  return {
    async get() {
      const response = await axios.get(url)
      return response.data
    },
    async post(data) {
      const response = await axios.post(url, data)
      return response.data
    },
    async update(id, data) {
      const response = await axios.put(`${url}/${id}`, data)
      return response.data
    },
    async delete(id) {
      const response = await axios.delete(`${url}/${id}`)
      return response.data
    },
  }
}

export default service
