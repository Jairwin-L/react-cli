import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Layout, Input, Form, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import '@css/pages/login.less'
import Footer from '../components/footer'
import * as AuthAction from '../api/request/auth'
import { LoginResponse } from '../api/response/auth'
import { HostName } from '../api/config'
import { titleMap } from '../utils'
import { Store } from 'antd/lib/form/interface'

export default (): JSX.Element => {
  const history = useHistory()
  const [loginFlag, setLoginFlag] = useState<boolean>(false)
  const onFinish = async (values: Store) => {
    setLoginFlag(true)
    const { username, password } = values
    try {
      const data: LoginResponse = await AuthAction.login({
        username,
        password
      })
      console.log(`data=======：`, data);
      sessionStorage.setItem('token', data?.token)
      setLoginFlag(false)
      history.push('/main') 
    } catch (err) {
      setLoginFlag(false)
      console.log(err); 
    }
  }

  return (
    <Layout className="login_container animated fadeIn">
      <div className="login_main">
        <div className="login_form">
          <h3>{`${titleMap(HostName) ?? ''}管理平台`}</h3>
          <Form name="normal_login" onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
              <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
              <Input type="password" size="large" placeholder="请输入密码" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" htmlType="submit" className="login_btn" disabled={loginFlag}>{`登录${loginFlag ? '中……' : ''}`}</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}
