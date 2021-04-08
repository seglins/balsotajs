import React from 'react'
import { Button } from '@chakra-ui/react'

const LogoutButton = (props) => {
  const handleClick = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <Button
      {...props}
      colorScheme="brand"
      variant="outline"
      onClick={handleClick}
    >
      Iziet
    </Button>
  )
}

export default LogoutButton
