import React, { useState, useEffect } from 'react'
import Vote from './Vote'
import Results from './Results'
import { Container } from '@chakra-ui/react'

import regionService from '../services/region'

const Home = ({ pages }) => {
  const [view, setView] = useState('vote')
  const [regions, setRegions] = useState([])
  const [parties, setParties] = useState([])

  useEffect(() => fetchRegions(), [])

  const fetchRegions = async () => {
    try {
      const regions = await regionService.get()
      setRegions(regions.sort((a, b) => ('' + a.name).localeCompare(b.name)))
    } catch (error) {
      console.error(error)
    }
  }

  const switchView = (view) => {
    window.scrollTo(0, 0)
    setView(view)
  }

  const handleVoteSuccess = (data) => {
    setParties(data.partiesWithinRegion)
    switchView('results')
  }

  return (
    <Container
      maxW="container.lg"
      minH="100%"
      py={{ base: '30px', md: '50px' }}
    >
      {view === 'vote' && (
        <Vote regions={regions} onSuccess={handleVoteSuccess} />
      )}
      {view === 'results' && parties.length && (
        <Results
          parties={parties}
          onBack={() => switchView('vote')}
          aboutPage={pages.find((page) => page.isAboutPage)}
        />
      )}
    </Container>
  )
}

export default Home
