import React, { useEffect, useState } from 'react'
import Select from '../components/Select'
import Alert from '../components/Alert'
import iconCalendar from '../assets/icon-calendar.svg'
import iconGender from '../assets/icon-gender.svg'
import iconLatvia from '../assets/icon-latvia.svg'
import _ from 'lodash'
import { Stack, Text, Grid, Radio, RadioGroup, Button } from '@chakra-ui/react'

import voteService from '../services/vote'

const VoteForm = ({ onSuccess, regions = [] }) => {
  const [parties, setParties] = useState([])
  const [birthYear, setBirthYear] = useState('')
  const [gender, setGender] = useState('')
  const [region, setRegion] = useState('')
  const [party, setParty] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!birthYear || !gender || !region || !party) {
      setDisabled(true)
      return
    }
    setDisabled(false)
  }, [birthYear, gender, region, party])

  useEffect(() => {
    if (!region) {
      setParties([])
      return
    }

    setParties(regions.find((r) => r.id === region).parties)
  }, [region, regions])

  const vote = () => {
    setLoading(true)
    setTimeout(() => {
      voteService
        .post({
          birthYear,
          gender,
          region,
          party,
        })
        .then((data) => {
          if (data.events && data.events.length && window.dataLayer) {
            data.events.forEach((event) => {
              window.dataLayer.push({ event: event })
            })
          }
          setLoading(false)
          setBirthYear('')
          setGender('')
          setRegion('')
          setParty('')
          if (onSuccess) onSuccess(data)
        })
        .catch((error) => {
          console.error(error)
          setError({
            title: 'Jūsu izvēle netika pieņemta!',
            description: 'Lūdzu, mēģiniet vēlāk atkārtoti.',
          })
        })
    }, 500)
  }

  return (
    <Stack direction="column" spacing="6">
      <Text fontSize={['lg']} lineHeight="1.4" fontWeight="600">
        Jūsu profils
      </Text>
      <Stack direction="column" spacing="5" maxW="340px">
        <Select
          placeholder="Dzimšanas gads"
          onChange={(value) => setBirthYear(value)}
          value={birthYear}
          icon={iconCalendar}
          options={_.range(new Date().getFullYear() - 18, 1899).map((year) => ({
            value: year,
            name: year,
          }))}
        />
        <Select
          placeholder="Dzimums"
          onChange={(value) => setGender(value)}
          value={gender}
          icon={iconGender}
          options={[
            { value: 'female', name: 'Sieviete' },
            { value: 'male', name: 'Vīrietis' },
            { value: 'other', name: 'Nevēlos norādīt / cits' },
          ]}
        />
        {regions.length && (
          <Select
            placeholder="Vēlēšanu apgabals"
            onChange={(value) => setRegion(value)}
            value={region}
            icon={iconLatvia}
            options={regions.map((region) => ({
              value: region.id,
              name: region.name,
            }))}
          />
        )}
      </Stack>
      {parties.length && (
        <Stack direction="column" spacing="5">
          <Text fontSize={['lg']} lineHeight="1.4" fontWeight="600">
            Jūsu izvēle 2021.gada pašvaldību vēlēšanās?
          </Text>
          <RadioGroup onChange={setParty} value={party}>
            <Grid templateColumns="repeat(2)" gap={2}>
              {parties.map((party) => (
                <Radio
                  key={party.id}
                  colorScheme="brand"
                  value={party.id}
                  size="md"
                >
                  {party.name}
                </Radio>
              ))}
            </Grid>
          </RadioGroup>
        </Stack>
      )}

      {error && <Alert title={error.title} description={error.description} />}

      {!error && (
        <Button
          onClick={vote}
          isDisabled={disabled}
          isLoading={loading}
          colorScheme="brand"
          maxW="340px"
          borderRadius="50px"
          py="25px"
        >
          Balsot
        </Button>
      )}
    </Stack>
  )
}

export default VoteForm
