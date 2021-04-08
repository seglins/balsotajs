import { Box, Select as ChakraSelect } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'

const StyledChakraSelect = styled(ChakraSelect)`  
  padding-left: 60px;
  cursor: pointer;
  min-height: 50px;
  :required:invalid { color: rgba(0,0,0,0.25); }
  option:not(:disabled) { color: black; }
`

const Select = ({ onChange, options, placeholder = '', icon, value }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <Box
      borderRadius="30px"
      boxShadow="0px 0px 10px 5px rgba(0,0,0,0.1)"
      position="relative"
      minH="50px"
      background="white"
    >
      <Box
        position="absolute"
        width="25px"
        height="25px"
        left="20px"
        right="0"
        top="49%"
        transform="translateY(-50%)"
        bgImage={`url(${icon})`}
        bgPosition="center"
        bgSize="contain"
        bgRepeat="no-repeat"
      />

      <StyledChakraSelect
        variant="unstyled"
        position="absolute"
        top="0"
        bottom="0"
        border="none"
        style={{ height: "100% !important" }}
        placeholder={placeholder}
        onChange={handleChange}
        required
        value={value}
      > 
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </StyledChakraSelect>
    </Box>
  )
}

export default Select
