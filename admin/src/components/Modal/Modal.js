import React from 'react'
import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'

const Modal = ({
  size,
  isOpen,
  onClose,
  title,
  submitButtonText,
  submitButtonDisabled,
  submitButtonLoading,
  submitButtonOnClick,
  onCloseClick,
  children,
}) => {
  const handleCloseClick = () => {
    onClose()
    if (onCloseClick) onCloseClick()
  }

  return (
    <ChakraModal size={size ? size : 'md'}  isOpen={isOpen} onClose={handleCloseClick}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton onClick={handleCloseClick} />
        <ModalBody pb={6}>{children}</ModalBody>
        <ModalFooter>
          <Button
            mr="3"
            colorScheme="brand"
            onClick={submitButtonOnClick}
            isDisabled={submitButtonDisabled}
            isLoading={submitButtonLoading}
          >
            {submitButtonText}
          </Button>
          <Button onClick={handleCloseClick}>Aizvērt</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
