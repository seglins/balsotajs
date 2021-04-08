import React from 'react'
import { Link } from 'react-router-dom'
import { Text, Heading, Stack, Button, Flex } from '@chakra-ui/react'
import ResultChart from './ResultChart'

const Results = ({ parties, onBack, aboutPage }) => {
  return (
    <Stack direction="column" spacing={[4, 6]} mb={{ md: "50px" }}>
      <Heading
        as="h1"
        color="brand.500"
        fontSize={['3xl', '4xl', '5xl']}
        lineHeight="1.2"
      >
        Paldies, ka nobalsoji.
      </Heading>
      <Text fontSize={['md', 'lg']} lineHeight="1.4">
        Pēdējās 24h balsojušo sadalījums:
      </Text>
      <ResultChart parties={parties} />
      <Flex flex={['column', 'row']} wrap="wrap" justify={['center', 'right']} align="center">
        <Button
          onClick={onBack}
          color="brand.500"
          mb="10px"
          mr={['0', (aboutPage) ? '30px' : '0']}
          variant="unstyled"
        >
          Atpakaļ uz sākumu
        </Button>
        {aboutPage && (
          <Button
            to={aboutPage.path}
            as={Link}
            colorScheme="brand"
            mb="10px"
            borderRadius="50px"
            py="25px"
            px="40px"
          >
            Uzzināt vairāk par projektu
          </Button>
        )}
      </Flex>
    </Stack>
  )
}

export default Results
