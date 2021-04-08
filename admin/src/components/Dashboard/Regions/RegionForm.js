import React, { useState, useEffect } from 'react'
import regionService from '../../../services/region'
import Checkbox from '../../UI/Checkbox'
import Alert from '../../UI/Alert'
import Modal from '../../Modal/Modal'
import { Stack, Input, CheckboxGroup, useDisclosure } from '@chakra-ui/react'

const RegionForm = ({ region, parties, visible, onClose, onSuccess }) => {
  const modal = useDisclosure()
  const [selectedParties, setSelectedParties] = useState([])
  const [name, setName] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!name) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [name])

  useEffect(() => {
    if (visible) {
      modal.onOpen()
    } else {
      modal.onClose()
    }
  }, [visible, modal])

  useEffect(() => {
    setError('')
    if (region) {
      setName(region.name)
      setSelectedParties(region.parties.map((party) => party.id))
    } else {
      clearInputs()
    }
  }, [region])

  const clearInputs = () => {
    setName('')
    setSelectedParties([])
  }

  const handleSubmit = () => {
    setError('')
    setLoading(true)
    setTimeout(async () => {
      try {
        const data = { name, parties: selectedParties }
        if (region) {
          await regionService.update(region.id, data)
        } else {
          await regionService.post(data)
        }
        if (onSuccess) onSuccess()
        clearInputs()
        setLoading(false)
      } catch (error) {
        setError(`Neizdevās ${region ? 'saglabāt' : 'pievienot'}!`)
        setLoading(false)
      }
    }, 500)
  }

  const handleModalCloseClick = () => {
    clearInputs()
    onClose()
  }

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={modal.onClose}
      title={region ? region.name : 'Pievienot jaunu apgabalu'}
      submitButtonText={region ? 'Saglabāt' : 'Pievienot'}
      submitButtonDisabled={disabled}
      submitButtonLoading={loading}
      submitButtonOnClick={handleSubmit}
      onCloseClick={handleModalCloseClick}
    >
      <Stack spacing="4">
        {error && <Alert title={error} status="error" />}
        <Input
          placeholder="Apgabala nosaukums"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CheckboxGroup
          colorScheme="brand"
          value={selectedParties}
          onChange={(parties) => setSelectedParties(parties)}
        >
          <Stack spacing={2}>
            {parties.map((party) => (
              <Checkbox
                key={party.id}
                value={party.id}
                label={party.name}
                size="sm"
              />
            ))}
          </Stack>
        </CheckboxGroup>
      </Stack>
    </Modal>
  )
}

export default RegionForm
