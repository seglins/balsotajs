import React from 'react'
import { Button as ChakraButton, IconButton, Box } from '@chakra-ui/react'

const Button = ({ onClick, icon, text }) => {
  return (
    <Box display="inline-block">
      <ChakraButton
        display={{ base: icon ? 'none' : 'block', md: 'block' }}
        onClick={onClick}
        rightIcon={icon}
        colorScheme="brand"
      >
        {text}
      </ChakraButton>

      {icon && (
        <IconButton
          display={{ base: 'block', md: 'none' }}
          onClick={onClick}
          icon={icon}
          colorScheme="brand"
        />
      )}
    </Box>
  )
}

export default Button
