import React from 'react'
import Navigation from '../Navigation/Navigation'
import MobileMenu from '../Navigation/MobileMenu'
import { Box, Image, Flex } from '@chakra-ui/react'
import logo from '../../assets/logo.svg'

const Header = ({ views, onClick }) => {
  return (
    <Flex padding="20px 0px" align="center" justify="space-between">
      <Image src={logo} maxW={{ base: '150px', md: '200px' }} />
      <Box display={{ base: 'flex', lg: 'none' }} justifyContent="right">
        <MobileMenu views={views} onClick={onClick} />
      </Box>
      <Box display={{ base: 'none', lg: 'block' }}>
        <Navigation views={views} onClick={onClick} />
      </Box>
    </Flex>
  )
}

export default Header
