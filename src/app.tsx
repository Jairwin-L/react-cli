import { hot } from 'react-hot-loader';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import loadable from './utils/loadable';
// 公共模块
const DefaultLayout = loadable(() => import('./containers/layout'));

// 基础页面
const NotFound = loadable(() => import('./pages/auth/404'));
const ServerError = loadable(() => import('./pages/auth/500'));
const Login = loadable(() => import('./pages/login'));

function App() {
  return (
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
}

export default hot(module)(App);
