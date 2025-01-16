import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import ReactDOM from 'react-dom';
import App from './app';
import { titleMap } from './utils';
import './assets/css/app.less';
// import * as OfflinePluginRuntime from "offline-plugin/runtime";

const hostName = window.location.hostname;
document.title = `${titleMap(hostName) ?? ''}博客管理平台`;

// TODO:eslint
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('app'),
);

// OfflinePluginRuntime.install({
// 	onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
// 	// onInstalled: () => OfflinePluginRuntime.onInstalled(),
// 	onUpdated: () => location.reload(),
// });
