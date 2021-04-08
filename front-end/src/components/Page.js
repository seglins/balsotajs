import React, { useEffect, useState } from 'react'
import { Container, Heading, Box } from '@chakra-ui/react'

const Page = ({ page }) => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    if (!page) return
    const $content = document.createElement('div')
    $content.innerHTML = page.content
    $content.querySelectorAll('table').forEach(($table) => {
      const $wrapper = document.createElement('div')
      const $newTable = document.createElement('table')
      $newTable.innerHTML = $table.innerHTML
      $wrapper.classList.add('table-responsive')
      $newTable.classList.add('table')
      $wrapper.append($newTable)
      $table.parentNode.replaceChild($wrapper, $table)
    })
    setContent($content.innerHTML)
  }, [page])

  if (!page) return null

  return (
    <Container maxW="container.md" py={{ base: '30px', md: '50px' }}>
      <Heading as="h1" size="2xl" color="brand.500">
        {page.title}
      </Heading>
      <Box
        py="40px"
        className="page-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Container>
  )
}

export default Page
