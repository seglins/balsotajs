import React from 'react'
import milda from '../assets/milda.jpg'
import VoteForm from './VoteForm'
import { Box, Heading, Text, Stack } from '@chakra-ui/react'

const Vote = ({ regions, onSuccess }) => {
  return (
    <>
      <Box
        position="absolute"
        minH="100vh"
        minW="100%"
        left="0"
        right="0"
        top="0"
        bottom="0"
        opacity={{ base: 0.25, md: 0.5 }}
        zIndex="-1"
        bgImage={`url(${milda})`}
        bgPosition="top"
        bgRepeat="no-repeat"
      />

      <Stack direction="column" spacing="8" maxW="550px">
        <Stack direction="column" spacing={[4, 6]}>
          <Heading as="h1" fontSize={['3xl', '4xl', '5xl']} lineHeight="1.2">
            Kāda būs Tava
            <Text color="brand.500">izvēle 2021.gada</Text>
            pašvaldību vēlēšanās?
          </Heading>
          <Text fontSize={['md', 'lg']} lineHeight="1.4">
            Datu precizitātes nolūkā norādi savu novadu, vecumu un dzimumu
          </Text>
        </Stack>
        <VoteForm
          regions={regions}
          onSuccess={(data) => onSuccess(data)}
        />
      </Stack>
    </>
  )
}

export default Vote
