import { Button, Form, Input, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 5 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 5 },
};
export default function Add() {
  const history = useHistory();
  useEffect(() => {}, []);
  const onFinish = async () => {
    history.goBack();
  };
  return (
    <>
      <Breadcrumb
        arr={[
          {
            title: '管理员列表',
            path: '/admin/list',
          },
          {
            title: '添加',
          },
        ]}
      />
      <div className="base_container">
        <Form {...layout} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button onClick={() => history.goBack()}>取消</Button>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
