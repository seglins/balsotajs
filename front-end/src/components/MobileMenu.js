
import React from 'react'
import { Link } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'


const MobileMenu = ({ pages }) => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Options"
      icon={<HamburgerIcon />}
      size="md"
      variant="outline"
    />
    <MenuList>
      {pages.map((page) => (
        <MenuItem
          isFocusable={false}
          key={`mobile-menu__${page.slug}`}
          as={Link}
          to={page.path}
          fontWeight="600"
          _focus={{ background: 'transparent' }}
          _active={{ background: 'transparent' }}
          color={page.active ? 'brand.500' : 'inherit'}
        >
          {page.title}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
)

export default MobileMenu