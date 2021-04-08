import React, { useState, useEffect } from 'react'
import Table from '../../Table/Table'
import PageForm from './PageForm'
import pageService from '../../../services/page'
import sortBy from '../../../helpers/sortBy'
import Filter from '../../UI/Filter'
import AddButton from '../../UI/AddButton'
import { Stack } from '@chakra-ui/react'
import NProgress from 'nprogress'

const Pages = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [pages, setPages] = useState([])
  const [filteredPages, setFilteredPages] = useState([])
  const [pageToEdit, setPageToEdit] = useState(null)
  
  const fields = [{ label: 'Nosaukums', key: 'title' }]

  // eslint-disable-next-line
  useEffect(() => fetchData(), [])

  const fetchData = async () => {
    NProgress.start()
    try {
      await fetchPages()
    } catch (error) {
      console.error(error)
    }
    NProgress.done()
  }

  const fetchPages = async () => {
    try {
      let pages = await pageService.get()
      const sortedPages = sortBy.date(pages, 'created')
      setPages(sortedPages)
      setFilteredPages(sortedPages)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditClick = (page) => {
    if (!page) return
    setPageToEdit(page)
    setFormVisible(true)
  }

  const handleDeleteClick = (page) => {
    if (!page) return
    if (!window.confirm(`Vai tiešām dzēst ${page.title}?`)) return
    pageService
      .delete(page.id)
      .then(() => fetchPages())
      .catch((error) => console.error(error))
  }

  const resetFormVisibilityAndPageToEdit = () => {
    setFormVisible(false)
    setPageToEdit(null)
  }

  const handleFormSuccess = () => {
    resetFormVisibilityAndPageToEdit()
    setTimeout(() => fetchPages(), 100)
  }

  return (
    <Table
      data={filteredPages}
      headers={fields.map((field) => field.label)}
      fields={fields.map((field) => field.key)}
      dateField={{ label: 'Pievienota', key: 'created'}}
      keyField="id"
      title="Lapas"
      onDeleteButtonClick={handleDeleteClick}
      onEditButtonClick={handleEditClick}
      cellPadding={{ base: 3 }}
    >
      <Stack direction="row" spacing="3">
        <Filter
          data={pages}
          filterBy="title"
          onFilter={(data) => setFilteredPages(data)}
        />
        <AddButton onClick={() => setFormVisible(true)} />
      </Stack>
      <PageForm
        visible={formVisible}
        page={pageToEdit}
        onSuccess={handleFormSuccess}
        onClose={resetFormVisibilityAndPageToEdit}
      />
    </Table>
  )
}

export default Pages
