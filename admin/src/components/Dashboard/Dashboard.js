import React, { useState } from 'react'
import Header from '../Layout/Header'
import Regions from './Regions/Regions'
import Parties from './Parties/Parties'
import Results from './Results/Results'
import Pages from './Pages/Pages'
import { Box } from '@chakra-ui/react'

const Dashboard = () => {
  const [views, setViews] = useState([
    { name: 'Apgabali', active: false, component: <Regions /> },
    { name: 'Partijas', active: false, component: <Parties /> },
    { name: 'Rezultāti', active: true, component: <Results /> },
    { name: 'Lapas', active: false, component: <Pages /> },
  ])

  const changeView = (selectedView) => {
    setViews(
      views.map((v) => {
        const view = v
        if (view === selectedView) {
          view.active = true
        } else {
          view.active = false
        }
        return view
      })
    )
  }

  return (
    <>
      <Header views={views} onClick={changeView} />
      <Box py="50px">
        {views.map((view) => {
          if (view.active) {
            return (
              <Box key={view.name}>
                {view.active && view.component}
              </Box>
            )
          } else {
            return <Box key={view.name} />
          }
        })}
      </Box>
    </>
  )
}

export default Dashboard
