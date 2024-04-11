import { Button, Form, Input } from 'antd';
import Breadcrumb from '../../components/breadcrumb';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 5 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 5 },
};
export default function ChangePassword() {
  const onFinish = async () => {
    // const { username, password } = values;
    // console.log('username==========>：', username);
    // console.log('password==========>：', password);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Breadcrumb
        arr={[
          {
            title: '修改密码',
          },
        ]}
      />
      <div className="base_container">
        <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
