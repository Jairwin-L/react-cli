import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'

ReactDOM.render(
	<ConfigProvider locale={zhCN}>
		<App />
	</ConfigProvider>,
	document.getElementById('app')
)
