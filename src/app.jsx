import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Router from './router'

export default () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Router />
        </Switch>
      </BrowserRouter>
    </>
  )
}