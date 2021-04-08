import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const SearchButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      icon={<SearchIcon />}
    />
  )
}

export default SearchButton
