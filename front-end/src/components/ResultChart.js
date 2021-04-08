import React, { useEffect, useRef, useState } from 'react'
import { Stack, Flex, Box, Text, Center } from '@chakra-ui/react'
import Chart from 'chart.js'
import hexToRgba from 'hex-to-rgba'

const ResultChart = ({ parties }) => {
  // eslint-disable-next-line
  const [chart, setChart] = useState(null)

  const canvasRef = useRef()

  useEffect(() => {
    if (!parties || !parties.length) return
    const ctx = canvasRef.current.getContext('2d')
    const names = parties.map((party) => party.name)
    const votes = parties.map((party) => party.voteCountLast24Hours)
    const colors = parties.map((party) =>
      party.color ? party.color : '#58b2f6'
    )

    setChart(
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: names,
          datasets: [
            {
              backgroundColor: colors.map((color) => hexToRgba(color, '0.5')),
              borderColor: colors.map((color) => hexToRgba(color)),
              borderWidth: 1,
              data: votes,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMax: 100,
                  stepSize: 20,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  callback: () => {
                    return ''
                  },
                },
              },
            ],
          },
        },
      })
    )
  }, [parties])

  return (
    <Stack direction="column" spacing="6">
      <Flex direction="row" wrap="wrap">
        {parties.map((party) => {
          const color = party.color ? party.color : '#58b2f6'
          return (
            <Center mr="30px" mb="5px" key={party.id}>
              <Box
                w="14px"
                h="14px"
                mr="10px"
                border={`1px solid ${color}`}
                bg={hexToRgba(color, '0.5')}
              ></Box>
              <Text fontSize="sm">{party.name}</Text>
            </Center>
          )
        })}
      </Flex>
      <canvas ref={canvasRef}></canvas>
    </Stack>
  )
}

export default ResultChart
