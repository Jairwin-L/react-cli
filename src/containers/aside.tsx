import { Layout, Avatar } from 'antd';
import { MenuItem } from '../typings/menu';
import SideMenu from '@/components/menu';

const { Sider } = Layout;

interface Props {
  avatar?: string;
  menuToggle: boolean;
  menu: MenuItem[] | undefined;
}

export default function Aside(props: Props) {
  const { menuToggle, menu, avatar } = props;
  return (
    <Sider className="aside" collapsed={menuToggle}>
      <div className="logo">
        <Avatar src={avatar} />
      </div>
      <SideMenu menu={menu as MenuItem[]} />
    </Sider>
  );
}
