import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import loadable from './utils/loadable';
import 'animate.css';
// 公共模块
const DefaultLayout = loadable(() => import('./containers/layout'));

// 基础页面
const NotFound = loadable(() => import('./pages/auth/404'));
const ServerError = loadable(() => import('./pages/auth/500'));
const Login = loadable(() => import('./pages/login'));

const App = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route exact component={DefaultLayout} />
      <Route path="/500" exact component={ServerError} />
      <Route path="/404" exact component={NotFound} />
      <Redirect to="/main" />
    </Switch>
  </BrowserRouter>
);

export default hot(module)(App);
