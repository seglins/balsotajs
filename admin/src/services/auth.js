import axios from 'axios'

const instance = axios.create()

const url = `${process.env.REACT_APP_API_URL}/auth`

const login = async (credentials) => {
  const response = await instance.post(url, credentials)
  return response.data
}

const validate = async () => {
  const token = localStorage.getItem('token')
  const response = await instance.get(url, {
    headers: { Authorization: `bearer ${token}` }
  })
  
  return response.data
}

const authService = {
  login,
  validate
}

export default authService