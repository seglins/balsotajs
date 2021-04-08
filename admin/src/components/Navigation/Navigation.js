import React from 'react'
import { Stack, Button, Flex, Spacer } from '@chakra-ui/react'
import LogoutButton from '../Auth/LogoutButton'

const Navigation = ({ views, onClick }) => {
  if (!views) return null

  const handleClick = (e, view) => {
    e.preventDefault()
    if (!onClick) return
    onClick(view)
  }

  return (
    <Flex align="center" justify="justify-between">
      <Stack spacing="0" align="center" direction="row" wrap="wrap" mr="30px">
        {views.map((view) => (
          <Button
            onClick={ (e) => handleClick(e, view) }
            key={view.name}
            variant="ghost"
            px="30px"
            color={view.active ? 'brand.500' : 'inherit'}
          >
            {view.name}
          </Button>
        ))}
      </Stack>
      <Spacer />
      <LogoutButton />
    </Flex>
  )
}

export default Navigation
