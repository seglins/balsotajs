import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import Navigation from '../Navigation'

const Footer = ({ pages }) => {
  return (
    <Box
      minW="auto"
      px={{ base: '15px', lg: '30px' }}
      py="40px"
      position={{ md: 'absolute' }}
      right={{ md: '0' }}
      bottom={{ md: '0' }}
    >
      <Flex align="center" justify={{ base: "center", md: "right" }}>
        <Box>
          <Navigation pages={pages} prefix="footer" buttonSize="sm" />
        </Box>
      </Flex>
    </Box>
  )
}

export default Footer
