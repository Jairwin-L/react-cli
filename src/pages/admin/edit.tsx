import { Button, Form, Input, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 6 },
};
export default function Edit() {
  const history = useHistory();
  const [form] = Form.useForm();
  const [model] = useState();
  const onFinish = async () => {
    history.goBack();
  };
  const fetchModel = async () => {};
  useEffect(() => {
    fetchModel();
  }, []);
  return (
    <>
      <Breadcrumb
        arr={[
          {
            title: '管理员列表',
            path: '/admin/list',
          },
          {
            title: '编辑',
          },
        ]}
      />
      <div className="base_container">
        <Form {...layout} form={form} initialValues={model} onFinish={onFinish}>
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
