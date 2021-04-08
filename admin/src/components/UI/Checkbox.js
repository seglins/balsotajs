import { Checkbox as ChakraCheckbox } from '@chakra-ui/react'
import styled from 'styled-components'
import React from 'react'

const StyledCheckbox = styled(ChakraCheckbox)`
  span {
    &:first-of-type {
      position: relative;
      top: 4px;
    }
  }
`

const Checkbox = ({ label, value, size }) => {
  return (
    <StyledCheckbox alignItems="start" value={value} size={size}>
      {label}
    </StyledCheckbox>
  )
}

export default Checkbox
