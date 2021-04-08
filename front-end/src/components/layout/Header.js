import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Box, Image, Spacer } from '@chakra-ui/react'
import Navigation from '../Navigation'
import MobileMenu from '../MobileMenu'
import logo from '../../assets/logo.svg'

const Header = ({ pages }) => {
  return (
    <Box minW="100%" px={{ base: "15px", lg: "30px" }} py="20px">
      <Flex align="center">
        <Box>
          <Link to="/">
            <Image src={logo} maxW={{ base: '150px', md: '200px' }} />
          </Link>
        </Box>
        <Spacer />
        <Box display={{ base: 'block', md: 'none' }}>
          <MobileMenu pages={pages} />
        </Box>
        <Box display={{ base: 'none', md: 'block' }}>
          <Navigation pages={pages} prefix="header" />
        </Box>
      </Flex>
    </Box>
  )
}

export default Header
