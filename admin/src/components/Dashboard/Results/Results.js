import React, { useEffect, useState } from 'react'
import { Stack } from '@chakra-ui/react'
import sortBy from '../../../helpers/sortBy'
import { DateTime } from 'luxon'
import voteService from '../../../services/vote'
import regionService from '../../../services/region'
import NProgress from 'nprogress'
import Table from '../../Table/Table'
import ResultFilter from './ResultFilter'
import ResultExport from './ResultExport'

const Results = () => {
  const [votes, setVotes] = useState([])
  const [filteredVotes, setFilteredVotes] = useState([])
  const [regions, setRegions] = useState([])

  const genders = [
    { label: 'Vīrietis', key: 'male' },
    { label: 'Sieviete', key: 'female' },
    { label: 'Nevēlos norādīt / cits', key: 'other' },
  ]

  const fields = [
    { label: 'Apgabals', key: 'region' },
    { label: 'Partija', key: 'party' },
    { label: 'Dzimums', key: 'gender' },
    { label: 'Dzimšanas gads', key: 'birthYear' },
    { label: 'Datums', key: 'created' },
  ]

  // eslint-disable-next-line
  useEffect(() => fetchData(), [])

  const fetchData = async () => {
    NProgress.start()
    try {
      await fetchVotes()
      await fetchRegions()
    } catch (error) {
      console.error(error)
    }
    NProgress.done()
  }

  const fetchVotes = async () => {
    try {
      let votes = await voteService.get()

      votes = votes.map((vote) => {
        return {
          id: vote.id,
          region: vote.region.name,
          party: vote.party.name,
          birthYear: vote.birthYear,
          created: DateTime.fromISO(vote.created).toFormat('dd.LL.yyyy'),
          gender: genders.find((gender) => vote.gender === gender.key).label,
        }
      })

      const sortedVotes = sortBy.date(votes, 'created')
      setVotes(sortedVotes)
      setFilteredVotes(sortedVotes)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchRegions = async () => {
    try {
      const regions = await regionService.get()
      setRegions(regions.sort((a, b) => ('' + a.name).localeCompare(b.name)))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Table
      data={filteredVotes}
      headers={fields.map((field) => field.label)}
      fields={fields.map((field) => field.key)}
      keyField="id"
      title="Rezultāti"
    >
      <Stack spacing="3" direction="row">
        <ResultFilter
          genders={genders.map((gender) => gender.label)}
          regions={regions}
          votes={votes}
          onFilter={(votes) => setFilteredVotes(votes)}
        />
        <ResultExport
          data={filteredVotes}
          headers={fields}
          filename={`balsotajs${DateTime.now().toFormat('ddLLyyyy')}.csv`}
        />
      </Stack>
    </Table>
  )
}

export default Results
