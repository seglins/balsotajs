import React, { useEffect, useState } from 'react'
import { Stack, Input, Button, Image } from '@chakra-ui/react'
import Alert from '../UI/Alert'
import logo from '../../assets/logo.svg'
import authService from '../../services/auth'

const LoginForm = ({ onSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !password) {
      setDisabled(true)
      return
    }
    setDisabled(false)
  }, [username, password])

  const login = () => {
    setLoading(true)
    setTimeout(() => {
      authService.login({ username, password })
        .then((response) => {
          localStorage.setItem('token', response.token)
          setLoading(false)
          setUsername('')
          setPassword('')
          setError('')
          if (onSuccess) onSuccess()
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setError('Nepareizs lietotājvārds vai parole!')
          } else {
            setError('Nav iespējams pieslēgties!')
          }
          setLoading(false)
        })
    }, 500)
  }

  return (
    <Stack direction="column" spacing="3">
      <Image src={logo} mb="25px" maxW="200px" mx="auto" />
      {error && <Alert title={error} status="error" /> }
      <Input
        placeholder="Lietotājvārds"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Parole"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={login}
        colorScheme="brand"
        isFullWidth={true}
        isDisabled={disabled}
        isLoading={loading}
      >
        Ienākt
      </Button>
    </Stack>
  )
}

export default LoginForm
