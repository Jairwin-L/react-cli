import { BackTop, Modal, message } from 'antd';
import clsx from 'clsx';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import avatarPng from '../assets/img/jairwin.png';
import Footer from '../components/footer';
import Header from '../components/header';
import routes from '../routes';
import { MenuItem } from '../typings/menu';
import { Routes } from '../typings/route';
import Aside from './aside';
import menuList from './menu';
import '../styles/layout.less';

const token = sessionStorage.getItem('token');

const reducer = (state: { menuToggle: boolean }, action: { type: 'menuToggle' }) => {
  switch (action.type) {
    case 'menuToggle':
      return { ...state, menuToggle: !state.menuToggle };
    default:
      return state;
  }
};

export default function LayoutPage() {
  const history = useHistory();
  const [menu, setMenu] = useState<MenuItem[]>();
  const [loginFlag, setLoginFlag] = useState<boolean>(false);
  useEffect(() => {
    if (!token) {
      sessionStorage.clear();
      history.push('/');
    } else {
      fetchList();
    }
  }, [history]);
  const fetchList = () => setMenu(menuList);
  const [state, dispatch] = useReducer(reducer, { menuToggle: false });
  const onMenu = () => dispatch({ type: 'menuToggle' });
  const loginOut = () => setLoginFlag(true);
  const onOk = () => {
    sessionStorage.clear();
    history.push('/');
    message.success('登出成功');
  };

  return (
    <>
      <BackTop />
      <div
        className={clsx('layout-wrap', {
          'layout-wrap-aside': state.menuToggle,
        })}
      >
        <Aside menuToggle={state.menuToggle} menu={menu} />
        <div className="layout_container">
          <Header
            menuToggle={state.menuToggle}
            onMenu={onMenu}
            avatar={avatarPng}
            loginOut={loginOut}
          />
          <Switch>
            {routes.map((item: Routes) => {
              return (
                <Route
                  key={item.path}
                  exact
                  path={item.path}
                  render={(props) => <item.component {...props} />}
                />
              );
            })}
            <Redirect to="/auth/404" />
          </Switch>
          <Footer />
        </div>
      </div>
      <Modal
        title="提示"
        centered
        maskClosable={false}
        visible={loginFlag}
        onOk={onOk}
        closable={false}
        onCancel={() => setLoginFlag(false)}
      >
        确认退出登录？
      </Modal>
    </>
  );
}
