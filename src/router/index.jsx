import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import loadable from '../util/loadable'
// import 'animate.css'

// const Main = loadable(() => import('../pages'))
// const Detail = loadable(() => import('../pages/detail'))
// const Project = loadable(() => import('../pages/project'))

const Router = () => {
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

export default Router
