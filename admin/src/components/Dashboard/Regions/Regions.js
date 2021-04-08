import React, { useState, useEffect } from 'react'
import Table from '../../Table/Table'
import RegionForm from './RegionForm'
import regionService from '../../../services/region'
import partyService from '../../../services/party'
import sortBy from '../../../helpers/sortBy'
import Filter from '../../UI/Filter'
import AddButton from '../../UI/AddButton'
import { Stack } from '@chakra-ui/react'
import NProgress from 'nprogress'

const Regions = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [regions, setRegions] = useState([])
  const [filteredRegions, setFilteredRegions] = useState([])
  const [parties, setParties] = useState([])
  const [regionToEdit, setRegionToEdit] = useState(null)

  const fields = [{ label: 'Nosaukums', key: 'name' }]

  // eslint-disable-next-line
  useEffect(() => fetchData(), [])

  const fetchData = async () => {
    NProgress.start()
    try {
      await fetchRegions()
      await fetchParties()
    } catch (error) {
      console.error(error)
    }
    NProgress.done()
  }

  const fetchParties = async () => {
    try {
      const parties = await partyService.get()
      setParties(parties)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchRegions = async () => {
    try {
      let regions = await regionService.get()
      const sortedRegions = sortBy.date(regions, 'created')
      setRegions(sortedRegions)
      setFilteredRegions(sortedRegions)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditClick = (region) => {
    if (!region) return
    setRegionToEdit(region)
    setFormVisible(true)
  }

  const handleDeleteClick = (region) => {
    if (!region) return
    if (!window.confirm(`Vai tiešām dzēst ${region.name}?`)) return
    regionService
      .delete(region.id)
      .then(() => fetchRegions())
      .catch((error) => console.error(error))
  }

  const resetFormVisibilityAndRegionToEdit = () => {
    setFormVisible(false)
    setRegionToEdit(null)
  }

  const handleFormSuccess = () => {
    resetFormVisibilityAndRegionToEdit()
    setTimeout(() => fetchRegions(), 100)
  }

  return (
    <Table
      data={filteredRegions}
      headers={fields.map((field) => field.label)}
      fields={fields.map((field) => field.key)}
      dateField={{ label: 'Pievienots', key: 'created'}}
      keyField="id"
      title="Apgabali"
      onDeleteButtonClick={handleDeleteClick}
      onEditButtonClick={handleEditClick}
      cellPadding={{ base: 3 }}
    >
      <Stack direction="row" spacing="3">
        <Filter data={regions} onFilter={(data) => setFilteredRegions(data)} />
        <AddButton onClick={() => setFormVisible(true)} />
      </Stack>
      <RegionForm
        visible={formVisible}
        parties={parties}
        region={regionToEdit}
        onSuccess={handleFormSuccess}
        onClose={resetFormVisibilityAndRegionToEdit}
      />
    </Table>
  )
}

export default Regions
