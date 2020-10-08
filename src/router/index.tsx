import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Main from "../page/main";
import Demo from "../page/demo";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path='/demo' exact component={Demo} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
)