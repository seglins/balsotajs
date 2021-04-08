import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Fonts from './theme/Fonts'
import theme from './theme'
import './styles/index.scss'

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Fonts />
    <Router>
      <App />
    </Router>
  </ChakraProvider>,
  document.getElementById('root')
)