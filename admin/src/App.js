import React, { useEffect, useState } from 'react'
import { Container, Flex, Box } from '@chakra-ui/react'
import authService from './services/auth'
import LoginForm from './components/Auth/LoginForm'
import Dashboard from './components/Dashboard/Dashboard'
import NProgress from 'nprogress'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggingIn, setLoggingIn] = useState(true)

  useEffect(() => authenticate(), [])

  const authenticate = async () => {
    NProgress.start()
    try {
      await authService.validate()
      setLoggedIn(true)
      setLoggingIn(false)
    } catch (error) {
      setLoggedIn(false)
      setLoggingIn(false)
    }
    NProgress.done()
  }

  if (loggingIn) return null

  return (
    <Container maxW="container.xl">
      {!loggedIn && (
        <Flex minH="100vh" align="center" justify="center">
          <Box w="400px">
            <LoginForm onSuccess={() => setLoggedIn(true)}></LoginForm>
          </Box>
        </Flex>
      )}

      {loggedIn && <Dashboard />}
    </Container>
  )
}

export default App
