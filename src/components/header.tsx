import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';

const { Header } = Layout;

interface Props {
  onMenu: () => void;
  avatar: string;
  menuToggle: boolean;
  loginOut: () => void;
}

export default (props: Props) => {
  const history = useHistory();
  const { onMenu, avatar, menuToggle, loginOut } = props;
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          history.push('/auth/change-password');
        }}
      >
        <LogoutOutlined />
        修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={loginOut}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="header">
      <div className="left_container">
        <div onClick={onMenu}>{menuToggle ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
      </div>
      <div className="right_container">
        <Dropdown overlay={menu} overlayStyle={{ width: '150px' }}>
          <div className="ant-dropdown-link">
            <Avatar src={avatar} />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};
