import React from 'react'
import {
  Flex,
  Alert as ChakraAlert,
  AlertIcon as ChakraAlertIcon,
  AlertTitle as ChakraAlertTitle,
  AlertDescription as ChakraAlertDescription,
} from '@chakra-ui/react'

const Alert = ({ title, description, status }) => {
  return (
    <ChakraAlert status={status}>
      <ChakraAlertIcon />
      <Flex wrap="wrap">
        {title && <ChakraAlertTitle mr={2}>{title}</ChakraAlertTitle>}
        {description && (
          <ChakraAlertDescription>{description}</ChakraAlertDescription>
        )}
      </Flex>
    </ChakraAlert>
  )
}

export default Alert
