import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { Form, Input, Button, Space, Select } from 'antd'
import * as AdminAction from '../../api/request/admin'
import { ItemData } from '../../api/response/user'
import { RouterParams } from '../../typings/page'
import Breadcrumb from '../../components/breadcrumb'
const { Option } = Select;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 6 },
}
export default (): JSX.Element => {
  const history = useHistory()
  const id = useParams<RouterParams>().userId
  const [form] = Form.useForm()
  const [model] = useState()
  const [roleList, setRoleList] = useState<any>([])
  const onFinish = async (values: any) => {
    await AdminAction.update({
      ...values,
      id
    })
    history.goBack()
  }
  const fetchModel = async () => {
    const { data }: ItemData = await AdminAction.show({ id })
    form.setFieldsValue(data)
  }
  useEffect(() => {
    fetchModel()
  }, [])
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
            title: '编辑'
          }
        ]}></Breadcrumb>
      <div className="base_container">
        <Form
          {...layout}
          form={form}
          initialValues={model}
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
