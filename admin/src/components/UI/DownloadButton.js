import React from 'react'
import Button from './Button'
import { DownloadIcon } from '@chakra-ui/icons'

const DownloadButton = ({ onClick }) => (
  <Button icon={<DownloadIcon />} text="Lejupielādēt" onClick={onClick} />
)

export default DownloadButton
