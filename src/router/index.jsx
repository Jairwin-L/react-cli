import React, { lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import loadable from '../util/loadable'
// import 'animate.css'

const Main = lazy(() => import('../page/main'))
// const Detail = loadable(() => import('../pages/detail'))
// const Project = loadable(() => import('../pages/project'))

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Main} />
        {/* <Route path='/detail/:id' exact component={Detail} />
        <Route path='/project' exact component={Project} />
        <Redirect to='/' /> */}
      </Switch>
    </BrowserRouter>
  )
}
