import React from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Input,
} from '@chakra-ui/react'

const Filter = ({ data, filterBy, onFilter }) => {
  const handleChange = (e) => {
    const value = e.target.value
    
    if (!value) {
      if (onFilter) onFilter(data)
      return
    }

    const filtered = data.filter((item) => {
      const field = filterBy ? item[filterBy] : item.name
      return field.toLowerCase().includes(value.toLowerCase())
    })

    if (onFilter) onFilter(filtered)
  }

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <IconButton icon={<SearchIcon />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Input onChange={handleChange} placeholder="Meklēt" />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Filter
