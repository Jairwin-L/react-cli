import React, { useState, useReducer, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Layout, BackTop, message, Modal } from 'antd';
import { MenuItem } from '../typings/menu';
import { Routes } from '../typings/route';
import routes from '../routes';
import avatarPng from '@img/jairwin.png';
import menuList from './menu';
import '@css/layout.less';
import Header from '../components/header';
import Aside from './aside';
import Footer from '../components/footer';

const token = sessionStorage.getItem('token');

const reducer = (state: { menuToggle: boolean }, action: { type: 'menuToggle' }) => {
  switch (action.type) {
    case 'menuToggle':
      return { ...state, menuToggle: !state.menuToggle };
    default:
      return state;
  }
};

export default (): JSX.Element => {
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
      <Aside menuToggle={state.menuToggle} menu={menu} />
      <Layout
        style={{
          marginLeft: state.menuToggle ? '80px' : '200px',
          minHeight: '100vh',
        }}
      >
        <Header
          menuToggle={state.menuToggle}
          onMenu={onMenu}
          avatar={avatarPng}
          loginOut={loginOut}
          history={history}
        />
        <div className="layout_container">
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
        </div>
        <Footer />
      </Layout>
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
};
