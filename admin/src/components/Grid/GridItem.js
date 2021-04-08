import React from 'react'
import { Flex, Text, IconButton, ButtonGroup } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

const GridItem = ({ text, onClick, deleteButton, editButton }) => {
  const handleEditClick = () => onClick('edit')
  const handleDeleteClick = () => onClick('delete')

  return (
    <Flex
      justify="space-between"
      align="center"
      p="10px 15px"
      borderWidth="1px"
      borderRadius="7px"
      borderColor="gray.100"
    >
      <Text fontWeight="500">{text}</Text>
      <ButtonGroup alignItems="center">
        {deleteButton && (
          <IconButton
            onClick={handleDeleteClick}
            colorScheme="red"
            variant="ghost"
            icon={<DeleteIcon />}
          />
        )}

        {editButton && (
          <IconButton onClick={handleEditClick} size="sm" icon={<EditIcon />} />
        )}
      </ButtonGroup>
    </Flex>
  )
}

export default GridItem
