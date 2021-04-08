import React, { useEffect, useState } from 'react'
import { Grid as ChakraGrid, Box } from '@chakra-ui/react'
import GridItem from './GridItem'
import GridHeader from './GridHeader'

const Grid = ({
  items = [],
  title,
  onAddButtonClick,
  onDeleteButtonClick,
  onEditButtonClick,
  itemNameField,
}) => {
  const [filteredItems, setFilteredItems] = useState([])
  const [filter, setFilter] = useState('')

  const handleClick = (action, item) => {
    if (action === 'add') onAddButtonClick()
    if (action === 'edit') onEditButtonClick(item)
    if (action === 'delete') onDeleteButtonClick(item)
  }

  useEffect(() => {
    if (filter) {
      setFilteredItems(
        items.filter((item) => {
          const name = (itemNameField) ? item[itemNameField] : item.name
          return name.toLowerCase().includes(filter.toLowerCase())
        })
      )
    } else {
      setFilteredItems(items)
    }
  }, [items, filter, itemNameField])

  return (
    <Box>
      <GridHeader
        title={title}
        onClick={handleClick}
        onFilter={(pattern) => setFilter(pattern)}
      />
      <ChakraGrid
        gap={{ base: 3, md: 4 }}
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
      >
        {filteredItems.map((item) => (
          <GridItem
            key={item.id}
            text={itemNameField ? item[itemNameField] : item.name}
            editButton={true}
            deleteButton={true}
            onClick={(action) => handleClick(action, item)}
          />
        ))}
      </ChakraGrid>
    </Box>
  )
}

export default Grid
