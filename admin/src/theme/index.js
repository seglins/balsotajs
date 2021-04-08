import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  colors: {
    brand: {
      100: '#dff5ff',
      200: '#b3defe',
      300: '#85c8f9',
      400: '#58b2f6',
      500: '#2f9cf1',
      600: '#1c83d8',
      700: '#1066a9',
      800: '#06497a',
      900: '#002c4b',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  components: {
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: 'unset',
            width: 'unset',
          },
        },
      },
    },
  },
  styles: {
    global: {
      '.nprogress-busy #root': {
        position: 'relative',
        zIndex: -1,
      },
    },
  },
  shadows: {
    outline: 'none',
  },
})
