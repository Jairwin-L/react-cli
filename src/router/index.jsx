import React from 'react'
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Main from "../page/main";
import Demo from "../page/demo";

export default hot(module)(
  () => (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/demo' exact component={Demo} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  )
)
