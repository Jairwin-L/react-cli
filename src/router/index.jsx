import React, { lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
const Main = lazy(() => import('../page/main'))
const Demo = lazy(() => import('../page/demo'))

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/demo' exact component={Demo} />
        {/* <Route path='/detail/:id' exact component={Detail} />
        <Route path='/project' exact component={Project} />
        <Redirect to='/' /> */}
      </Switch>
    </BrowserRouter>
  )
}
