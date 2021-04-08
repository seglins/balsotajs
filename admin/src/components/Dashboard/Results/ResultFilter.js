import React, { useEffect, useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import InputMask from 'react-input-mask'
import { DateTime } from 'luxon'
import _ from 'lodash'
import {
  Box as ChakraBox,
  Stack,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Input,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

const parseDate = (date) => DateTime.fromFormat(date, 'dd.LL.yyyy')

const ResultFilter = ({ votes = [], regions = [], genders = [], onFilter }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [parties, setParties] = useState([])
  const [minDate, setMinDate] = useState('')
  const [maxDate, setMaxDate] = useState('')
  const [minYear, setMinYear] = useState('')
  const [maxYear, setMaxYear] = useState('')
  const [party, setParty] = useState('')
  const [region, setRegion] = useState('')
  const [gender, setGender] = useState('')

  useEffect(() => {
    setParty('')
    if (region) {
      setParties(regions.find((r) => r.name === region).parties)
    } else {
      setParties([])
    }
  }, [region, regions])

  const handleFilterClick = () => {
    let filtered = votes

    filtered = _.filter(filtered, (vote) => {
      if (!region) return true
      return region === vote.region
    })

    filtered = _.filter(filtered, (vote) => {
      if (!party) return true
      return party === vote.party
    })

    filtered = _.filter(filtered, (vote) => {
      if (!gender) return true
      return gender === vote.gender
    })

    filtered = _.filter(filtered, (vote) => {
      if (minDate && !maxDate)
        return parseDate(minDate) <= parseDate(vote.created)
      else if (!minDate && maxDate)
        return parseDate(maxDate) >= parseDate(vote.created)
      else if (minDate && maxDate)
        return (
          parseDate(minDate) <= parseDate(vote.created) &&
          parseDate(maxDate) >= parseDate(vote.created)
        )
      else return true
    })

    filtered = _.filter(filtered, (vote) => {
      if (minYear && !maxYear)
        return parseInt(minYear) <= parseInt(vote.birthYear)
      else if (!minYear && maxYear)
        return parseInt(maxYear) >= parseInt(vote.birthYear)
      else if (minYear && maxYear)
        return (
          parseInt(minYear) <= parseInt(vote.birthYear) &&
          parseInt(maxYear) >= parseInt(vote.birthYear)
        )
      else return true
    })

    onFilter(filtered)
    onClose()
  }

  const handleResetClick = () => {
    clear()
    onFilter(votes)
    onClose()
  }

  const clear = () => {
    setMinDate('')
    setMaxDate('')
    setMinYear('')
    setMaxYear('')
    setParty('')
    setRegion('')
    setGender('')
  }

  return (
    <Popover isLazy isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <IconButton icon={<SearchIcon />} onClick={onOpen} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Box label="Apgabals">
            <Select
              size="sm"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">Visi</option>
              {regions.map((region) => (
                <option value={region.name} key={region.name}>
                  {region.name}
                </option>
              ))}
            </Select>
          </Box>

          <Box label="Partija">
            <Select
              size="sm"
              value={party}
              onChange={(e) => setParty(e.target.value)}
            >
              <option value="">Visas</option>
              {parties.map((party) => (
                <option value={party.name} key={party.name}>
                  {party.name}
                </option>
              ))}
            </Select>
          </Box>

          <Box label="Dzimums">
            <Select
              size="sm"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Visi</option>
              {genders.map((gender) => (
                <option value={gender} key={gender}>
                  {gender}
                </option>
              ))}
            </Select>
          </Box>

          <Box label="Dzimšanas gads">
            <Stack direction="column" spacing="2" justifyContent="stretch">
              <YearInput
                min={1900}
                max={maxYear ? maxYear : new Date().getFullYear() - 18}
                addonText="No"
                value={minYear}
                onChange={(year) => setMinYear(year)}
              />
              <YearInput
                min={minYear ? minYear : 1900}
                max={new Date().getFullYear() - 18}
                addonText="Līdz"
                value={maxYear}
                onChange={(year) => setMaxYear(year)}
              />
            </Stack>
          </Box>

          <Box label="Datums">
            <Stack direction="column" spacing="2" justifyContent="stretch">
              <DateInput
                value={minDate}
                onChange={(date) => setMinDate(date)}
                addonText="No"
              />
              <DateInput
                value={maxDate}
                onChange={(date) => setMaxDate(date)}
                addonText="Līdz"
              />
            </Stack>
          </Box>

          <Box>
            <Button
              isFullWidth={true}
              colorScheme="brand"
              size="sm"
              mb="2"
              onClick={handleFilterClick}
            >
              Filtrēt
            </Button>
            <Button
              isFullWidth={true}
              variant="ghost"
              size="sm"
              colorScheme="red"
              onClick={handleResetClick}
            >
              Notīrīt
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const Box = ({ label, children }) => (
  <ChakraBox mb="3">
    <Text fontWeight="600" color="gray.600" fontSize="sm" mb="1">
      {label}
    </Text>
    {children}
  </ChakraBox>
)

const InputGroupWithAddon = ({ addonText, children }) => (
  <InputGroup size="sm">
    <InputLeftAddon fontSize="xs" fontWeight="500" bg="none" color="gray.300">
      {addonText}
    </InputLeftAddon>
    {children}
  </InputGroup>
)

const YearInput = ({ addonText, min, max, value, onChange = () => {} }) => {
  return (
    <InputGroupWithAddon addonText={addonText}>
      <NumberInput
        min={min}
        max={max}
        keepWithinRange={false}
        w="100%"
        value={value}
        onChange={onChange}
      >
        <NumberInputField />
      </NumberInput>
    </InputGroupWithAddon>
  )
}

const DateInput = ({ addonText, value, onChange = () => {} }) => {
  const handleChange = (e) => onChange(e.target.value)

  return (
    <InputGroupWithAddon addonText={addonText}>
      <InputMask mask="99.99.9999" value={value} onChange={handleChange}>
        <Input />
      </InputMask>
    </InputGroupWithAddon>
  )
}

export default ResultFilter
