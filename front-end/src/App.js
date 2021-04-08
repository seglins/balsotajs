import React, { useEffect, useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import Page from './components/Page'

import pageService from './services/page'

const App = () => {
  const location = useLocation()
  const [pages, setPages] = useState([
    {
      active: false,
      title: 'Aptauja',
      slug: 'aptauja',
      path: `/`,
      displayInMenu: 'header',
    },
  ])

  useEffect(() => {
    pageService
      .get()
      .then((returnedPages) => {
        setPages(
          pages.concat(
            returnedPages
              .map((page) => {
                const path = `/${page.slug}`
                return { ...page, path, active: path === location.pathname }
              })
          )
        )
      })
      .catch((error) => console.error(error))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const currentPageIndex = pages.findIndex(
      (page) => page.path === location.pathname
    )

    setPages(
      pages.map((page, i) => {
        if (i === currentPageIndex) {
          page.active = true
        } else {
          page.active = false
        }
        return page
      })
    )

    window.scrollTo(0, 0)
    // eslint-disable-next-line
  }, [location.pathname])

  return (
    <>
      <Header pages={pages.filter((page) => page.displayInMenu === 'header')} />

      <Switch>
        {pages
          .filter((page) => page.path !== '/')
          .map((page) => (
            <Route
              key={page.slug ? page.slug : page.path}
              path={page.path}
              exact
            >
              <Page page={page} />
            </Route>
          ))}
        <Route path="/" exact>
          <Home pages={pages} />
        </Route>
      </Switch>

      <Footer pages={pages.filter((page) => page.displayInMenu === 'footer')} />
    </>
  )
}

export default App
