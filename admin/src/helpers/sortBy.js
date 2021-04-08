const date = (array, field) => {
  if (!field || !array) return
  return array.sort((a, b) => {
    return new Date(b[field]) - new Date(a[field])
  })
}

const sortBy = {
  date
}

export default sortBy