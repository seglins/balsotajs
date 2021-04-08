import React from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'
import LogoutButton from '../Auth/LogoutButton'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Flex,
  IconButton,
} from '@chakra-ui/react'

const MobileMenu = ({ views, onClick }) => {
  if (!views) return null

  const handleClick = (e, view) => {
    e.preventDefault()
    if (!onClick) return
    onClick(view)
  }

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        size="md"
        variant="outline"
      />
      <MenuList>
        {views.map((view) => (
          <MenuItem
            isFocusable={false}
            onClick={ (e) => handleClick(e, view) }
            key={view.name}
            fontWeight="600"
            _focus={{ background: 'transparent' }}
            _active={{ background: 'transparent' }}
            color={view.active ? 'brand.500' : 'inherit'}
          >
            {view.name}
          </MenuItem>
        ))}
        <MenuDivider />
        <Flex padding="5px 10px" justify="center">
          <LogoutButton isFullWidth={true} />
        </Flex>
      </MenuList>
    </Menu>
  )
}

export default MobileMenu
