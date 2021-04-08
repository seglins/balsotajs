import React, { useState, useEffect } from 'react'
import Table from '../../Table/Table'
import PartyForm from './PartyForm'
import partyService from '../../../services/party'
import sortBy from '../../../helpers/sortBy'
import Filter from '../../UI/Filter'
import AddButton from '../../UI/AddButton'
import { Stack } from '@chakra-ui/react'
import NProgress from 'nprogress'

const Parties = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [parties, setParties] = useState([])
  const [filteredParties, setFilteredParties] = useState([])
  const [partyToEdit, setPartyToEdit] = useState(null)

  const fields = [{ label: 'Nosaukums', key: 'name' }]

  // eslint-disable-next-line
  useEffect(() => fetchData(), [])

  const fetchData = async () => {
    NProgress.start()
    try {
      await fetchParties()
    } catch (error) {
      console.error(error)
    }
    NProgress.done()
  }

  const fetchParties = async () => {
    try {
      const parties = await partyService.get()
      const sortedParties = sortBy.date(parties, 'created')
      setParties(sortedParties)
      setFilteredParties(sortedParties)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditClick = (party) => {
    if (!party) return
    setPartyToEdit(party)
    setFormVisible(true)
  }

  const handleDeleteClick = (party) => {
    if (!party) return
    if (!window.confirm(`Vai tiešām dzēst ${party.name}?`)) return
    partyService
      .delete(party.id)
      .then(() => fetchParties())
      .catch((error) => console.error(error))
  }

  const resetFormVisibilityAndPartyToEdit = () => {
    setFormVisible(false)
    setPartyToEdit(null)
  }

  const handleFormSuccess = () => {
    resetFormVisibilityAndPartyToEdit()
    setTimeout(() => fetchParties(), 100)
  }

  return (
    <Table
      data={filteredParties}
      headers={fields.map((field) => field.label)}
      fields={fields.map((field) => field.key)}
      dateField={{ label: 'Pievienota', key: 'created'}}
      keyField="id"
      title="Partijas"
      onDeleteButtonClick={handleDeleteClick}
      onEditButtonClick={handleEditClick}
      cellPadding={{ base: 3 }}
    >
      <Stack direction="row" spacing="3">
        <Filter data={parties} onFilter={(data) => setFilteredParties(data)} />
        <AddButton onClick={() => setFormVisible(true)} />
      </Stack>
      <PartyForm
        visible={formVisible}
        party={partyToEdit}
        onSuccess={handleFormSuccess}
        onClose={resetFormVisibilityAndPartyToEdit}
      />
    </Table>
  )
}

export default Parties
