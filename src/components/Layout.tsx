import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { Fragment } from 'react'
const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main className="app">
        <Outlet />
      </main>
    </Fragment>
  )
}

export default Layout
