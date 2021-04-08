
import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Button } from '@chakra-ui/react'

const Navigation = ({ pages, prefix, buttonSize }) => (
  <Stack spacing="0" px="20px" align="center" direction="row">
    {pages.map((page) => (
      <Button
        to={page.path}
        size={buttonSize || 'md'}
        key={`${prefix}__${page.slug}`}
        as={Link}
        variant="ghost"
        padding="10px 20px"
        color={page.active ? 'brand.500' : 'inherit'}
        style={{ boxShadow: 'none', height: 'auto' }}
      >
        {page.title}
      </Button>
    ))}
  </Stack>
)

export default Navigation