import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { useHistory } from 'react-router-dom';

interface Props {
  onMenu: () => void;
  avatar: string;
  menuToggle: boolean;
  loginOut: () => void;
}

export default function Header(props: Props) {
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
    <header className="header">
      <div className="left_container" onClick={onMenu}>
        {menuToggle ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="right_container">
        <Dropdown overlay={menu} overlayStyle={{ width: '150px' }}>
          <div className="ant-dropdown-link">
            <Avatar src={avatar} />
          </div>
        </Dropdown>
      </div>
    </header>
  );
}
