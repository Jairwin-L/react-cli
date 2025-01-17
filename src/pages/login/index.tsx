import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { useHistory } from 'react-router-dom';
import Footer from '@/components/footer';
import { HostName } from '../../api/config';
import * as AuthAction from '../../api/request/auth';
import { titleMap } from '../../utils';
import './login.less';

export default function Page() {
  const history = useHistory();
  const [loginFlag, setLoginFlag] = useState<boolean>(false);
  const onFinish = async (values: Store) => {
    setLoginFlag(true);
    const { username = 'admin', password = '123456' } = values;
    try {
      const resp: any = await AuthAction.login({
        username,
        password,
      });
      const { success, data } = resp;
      if (!success) return;
      sessionStorage.setItem('token', data?.token);
      setLoginFlag(false);
      history.push('/main', { replace: true });
    } catch (error) {
      setLoginFlag(false);
      console.log(error);
    }
  };

  return (
    <Layout className="login_container animated fadeIn">
      <div className="login_main">
        <div className="login_form">
          <h3>{`${titleMap(HostName) ?? ''}管理平台`}</h3>
          <Form name="normal_login" onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input
                type="password"
                size="large"
                placeholder="请输入密码"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="login_btn"
              >{`登录${loginFlag ? '中……' : ''}`}</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
