import React from 'react'
import AddButton from '../UI/AddButton'
import Filter from '../UI/Filter'
import { Flex, Heading, Stack } from '@chakra-ui/react'

const GridHeader = ({ title, onClick, onFilter = () => {} }) => {
  return (
    <Flex direction="row" justify="space-between" align="center" m={0} mb={12}>
      <Heading textAlign="left" m="0">
        {title}
      </Heading>
      <Stack direction="row" spacing="3">
        <Filter onChange={onFilter} />
        <AddButton onClick={() => onClick('add')} />
      </Stack>
    </Flex>
  )
}

export default GridHeader
