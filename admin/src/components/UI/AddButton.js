import React from 'react'
import Button from './Button'
import { AddIcon } from '@chakra-ui/icons'

const AddButton = ({ onClick }) => (
  <Button icon={<AddIcon />} text="Pievienot" onClick={onClick} />
)

export default AddButton
