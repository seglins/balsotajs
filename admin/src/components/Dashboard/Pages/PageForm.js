import React, { useEffect, useState, useRef } from 'react'
import pageService from '../../../services/page'
import Alert from '../../UI/Alert'
import Modal from '../../Modal/Modal'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import {
  Flex,
  Stack,
  Input,
  RadioGroup,
  Radio,
  Text,
  FormControl as ChakraFormControl,
  FormLabel,
  Switch,
  useDisclosure
} from '@chakra-ui/react'

const PageForm = ({ page, visible, onClose, onSuccess }) => {
  const modal = useDisclosure()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState()
  const [displayInMenu, setDisplayInMenu] = useState('header')
  const [isAboutPage, setIsAboutPage] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const editorRef = useRef()

  useEffect(() => {
    if (!title || !displayInMenu) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [title, displayInMenu])

  useEffect(() => {
    if (visible) {
      modal.onOpen()
    } else {
      modal.onClose()
    }
  }, [page, modal, visible])

  useEffect(() => {
    setError('')
    if (page) {
      setTitle(page.title)
      setContent(page.content)
      setIsPublic(page.isPublic)
      setIsAboutPage(page.isAboutPage)
      setDisplayInMenu(page.displayInMenu)
    } else {
      clearInputs()
    }
  }, [page])

  const clearInputs = () => {
    setTitle('')
    setContent('')
    setIsPublic(false)
    setIsAboutPage(false)
    setDisplayInMenu('header')
  }

  const handleSubmit = () => {
    setError('')
    setLoading(true)
    setTimeout(async () => {
      try {
        const data = { title, content, displayInMenu, isAboutPage, isPublic }
        if (page) {
          await pageService.update(page.id, data)
        } else {
          await pageService.post(data)
        }
        if (onSuccess) onSuccess()
        clearInputs()
        setLoading(false)
      } catch (error) {
        setError(`Neizdevās ${page ? 'saglabāt' : 'pievienot'}!`)
        setLoading(false)
      }
    }, 500)
  }

  const handleModalCloseClick = () => {
    clearInputs()
    onClose()
  }

  const editorOptions = {
    height: 300,
    imageFileInput: false,
    buttonList: [
      ['undo', 'redo', 'formatBlock'],
      [
        'bold',
        'underline',
        'italic',
        'strike',
        'subscript',
        'superscript',
        'removeFormat',
      ],
      ['list', 'table'],
      ['link', 'image', 'showBlocks'],
    ],
  }

  const FormControl = ({ children }) => (
    <ChakraFormControl
      minWidth="auto"
      width="auto"
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      mr="8"
      my="1"
    >
      {children}
    </ChakraFormControl>
  )

  return (
    <Modal
      size="3xl"
      isOpen={modal.isOpen}
      onClose={modal.onClose}
      title={page ? page.title : 'Pievienot jaunu lapu'}
      submitButtonText={page ? 'Saglabāt' : 'Pievienot'}
      submitButtonDisabled={disabled}
      submitButtonLoading={loading}
      submitButtonOnClick={handleSubmit}
      onCloseClick={handleModalCloseClick}
    >
      <Stack spacing="4">
        {error && <Alert title={error} status="error" />}
        <Input
          placeholder="Lapas nosaukums"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Flex direction="row" wrap="wrap">
          <FormControl>
            <FormLabel htmlFor="isVisible" mb="0">
              Publiska
            </FormLabel>
            <Switch
              id="isVisible"
              colorScheme="brand"
              size="sm"
              onChange={() => setIsPublic(!isPublic)}
              isChecked={isPublic}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="isAboutPage" mb="0">
              <Text display="inline" fontStyle="italic">
                About
              </Text>{' '}
              lapa
            </FormLabel>
            <Switch
              id="isAboutPage"
              colorScheme="brand"
              size="sm"
              onChange={() => setIsAboutPage(!isAboutPage)}
              isChecked={isAboutPage}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="displayInMenu" mb="0">
              Izvēlne
            </FormLabel>
            <RadioGroup
              id="displayInMenu"
              colorScheme="brand"
              size="sm"
              value={displayInMenu}
              onChange={setDisplayInMenu}
            >
              <Flex direction="row" wrap="wrap">
                <Radio value="header" mr="3">
                  Header
                </Radio>
                <Radio value="footer">Footer</Radio>
              </Flex>
            </RadioGroup>
          </FormControl>
        </Flex>
        <SunEditor
          ref={editorRef}
          setOptions={editorOptions}
          setContents={content}
          onChange={(content) => setContent(content)}
        />
      </Stack>
    </Modal>
  )
}

export default PageForm
