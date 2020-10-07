import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader';
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import App from './app'
import '@less/common'

const render = Component => {
  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <AppContainer>
        <Component />
      </AppContainer>
    </ConfigProvider>,
    document.getElementById('app'),
  );
};

render(App);

// webpack Hot Module Replacement API
if (module.hot) {
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept('./app', () => {
    // if you are using harmony modules ({modules:false})
    render(App);
    // in all other cases - re-require App manually
    render(require('./app'));
  });
}