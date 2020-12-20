import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Form, Input, Button, Space, Select } from 'antd'
import * as AdminAction from '../../api/request/admin'
import Breadcrumb from '../../components/breadcrumb'
const { Option } = Select;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 5 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 5 },
};
export default (): JSX.Element => {
  const history = useHistory()
  const [roleList, setRoleList] = useState<any>([])
  useEffect(() => {
  }, [])
  const onFinish = async (values: any) => {
    const { username, password, roleId } = values
    await AdminAction.store({
      username,
      password,
    })
    history.goBack()
  }
  const onChange = (value: any) => {
    console.log(`selected ${value}`);
  }
  const onSearch = (value: any) => {
    console.log('search:', value);
  }
  return (
    <>
      <Breadcrumb
        arr={[
          {
            title: '管理员列表',
            path: '/admin/list'
          },
          {
            title: '添加'
          }
        ]}></Breadcrumb>
      <div className="base_container">
        <Form
          {...layout}
          onFinish={onFinish}
        >
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button onClick={() => history.goBack()}>取消</Button>
              <Button type="primary" htmlType="submit">确认</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
