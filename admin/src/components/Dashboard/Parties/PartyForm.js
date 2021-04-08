import React, { useState, useEffect } from 'react'
import partyService from '../../../services/party'
import Alert from '../../UI/Alert'
import Modal from '../../Modal/Modal'
import { HexColorPicker } from 'react-colorful'
import CircleIcon from '../../Icons/CircleIcon'
import { AddIcon } from '@chakra-ui/icons'
import {
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  Tag,
  TagLabel,
  TagCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

const PartyForm = ({ party, visible, onClose, onSuccess }) => {
  const modal = useDisclosure()
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState('')
  const [name, setName] = useState('')
  const [color, setColor] = useState('#58b2f6')
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
  }, [party, modal, visible])

  useEffect(() => {
    setError('')
    if (party) {
      setName(party.name)
      setEvents(party.events)
      if (party.color) setColor(party.color)
    } else {
      clearInputs()
    }
  }, [party])

  const clearInputs = () => {
    setName('')
    setColor('#58b2f6')
    setEvents([])
  }

  const handleSubmit = () => {
    setError('')
    setLoading(true)
    setTimeout(async () => {
      try {
        const data = { name, events, color }
        if (party) {
          await partyService.update(party.id, data)
        } else {
          await partyService.post(data)
        }
        if (onSuccess) onSuccess()
        clearInputs()
        setLoading(false)
      } catch (error) {
        setError(`Neizdevās ${party ? 'saglabāt' : 'pievienot'}!`)
        setLoading(false)
      }
    }, 500)
  }

  const removeEvent = (event) => {
    setEvents(events.filter(e => e !== event))
  }

  const addEvent = (event) => {
    if (events.includes(event) || !event) return
    setEvents(events.concat(event))
    setEvent('')
  }

  const handleModalCloseClick = () => {
    clearInputs()
    onClose()
  }

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={modal.onClose}
      title={party ? party.name : 'Pievienot jaunu partiju'}
      submitButtonText={party ? 'Saglabāt' : 'Pievienot'}
      submitButtonDisabled={disabled}
      submitButtonLoading={loading}
      submitButtonOnClick={handleSubmit}
      onCloseClick={handleModalCloseClick}
    >
      <Stack spacing="4">
        {error && <Alert title={error} status="error" />}
        <Input
          placeholder="Partijas nosaukums"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputGroup>
          <Input
            placeholder="Event nosaukums"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
          <InputRightElement
            children={
              <IconButton
                size="xs"
                variant="ghost"
                icon={<AddIcon />}
                onClick={() => addEvent(event)}
              />
            }
          />
        </InputGroup>
        {events.length && (
          <Flex wrap="wrap">
            {events.map((event) => (
              <Tag
                size="lg"
                key={event}
                variant="outline"
                colorScheme="brand"
                mr="10px"
                mb="10px"
              >
                <TagLabel>{event}</TagLabel>
                <TagCloseButton
                  onClick={() => removeEvent(event)}
                />
              </Tag>
            ))}
          </Flex>
        )}
        <InputGroup>
          <Input
            placeholder="Krāsas HEX kods"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <InputRightElement
            children={
              <Popover variant="responsive">
                <PopoverTrigger>
                  <Button variant="unstyled">
                    <CircleIcon color={color} boxSize={5} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent border="none" bg="transparent">
                  <HexColorPicker color={color} onChange={setColor} />
                </PopoverContent>
              </Popover>
            }
          />
        </InputGroup>
      </Stack>
    </Modal>
  )
}

export default PartyForm
