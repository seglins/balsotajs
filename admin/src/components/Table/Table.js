import React from 'react'
import styled from 'styled-components'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { DateTime } from 'luxon'
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  Heading,
  Tag,
  TagLabel,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react'

const TableWrapper = styled(Box)`
  tbody tr:hover {
    background: rgba(0, 0, 0, 0.02);
  }
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`

const Table = ({
  data = [],
  headers = [],
  fields = [],
  keyField,
  title,
  children,
  onDeleteButtonClick,
  onEditButtonClick,
  cellPadding,
  dateField,
}) => {
  return (
    <>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        m={0}
        mb={12}
      >
        <Flex direction="row" flexWrap="wrap" align="center">
          <Heading textAlign="left" m="0" mr="5">
            {title}
          </Heading>
          <Tag colorScheme="brand">
            <TagLabel display="flex" direction="row" wrap="nowrap">
              {data.length}
            </TagLabel>
          </Tag>
        </Flex>
        {children}
      </Flex>

      <TableWrapper overflowX="auto">
        <ChakraTable variant="simple" size="sm">
          <Thead>
            <Tr>
              {headers.map((header) => (
                <Th py={{ base: 2, md: 4 }} key={`thead_th_${header}`}>
                  {header}
                </Th>
              ))}
              {dateField && <Th py={{ base: 2, md: 4 }}>{dateField.label}</Th>}
              {(onDeleteButtonClick || onDeleteButtonClick) && <Th></Th>}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => {
              return (
                <Tr key={item[keyField]}>
                  {fields.map((field) => (
                    <Td
                      py={cellPadding ? cellPadding : { base: 2, md: 4 }}
                      key={item[field]}
                    >
                      {item[field]}
                    </Td>
                  ))}
                  {dateField && (
                    <Td py={cellPadding ? cellPadding : { base: 2, md: 4 }}>
                      {DateTime.fromISO(item[dateField.key]).toFormat(
                        'dd.LL.yyyy'
                      )}
                    </Td>
                  )}
                  <Td py={cellPadding ? cellPadding : { base: 2, md: 4 }}>
                    <ButtonGroup
                      alignItems="center"
                      width="100%"
                      justifyContent="flex-end"
                      size="sm"
                    >
                      {onEditButtonClick && (
                        <IconButton
                          onClick={() => onEditButtonClick(item)}
                          icon={<EditIcon />}
                        />
                      )}
                      {onDeleteButtonClick && (
                        <IconButton
                          onClick={() => onDeleteButtonClick(item)}
                          colorScheme="red"
                          variant="ghost"
                          icon={<DeleteIcon />}
                        />
                      )}
                    </ButtonGroup>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              {headers.map((header) => (
                <Th py={{ base: 2, md: 4 }} key={`tfoot_th_${header}`}>
                  {header}
                </Th>
              ))}
              {dateField && <Th py={{ base: 2, md: 4 }}>{dateField.label}</Th>}
              {(onDeleteButtonClick || onDeleteButtonClick) && <Th></Th>}
            </Tr>
          </Tfoot>
        </ChakraTable>
      </TableWrapper>
    </>
  )
}

export default Table
