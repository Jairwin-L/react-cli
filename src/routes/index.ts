import loadable from '../utils/loadable';
import AdminRouter from '../pages/admin/router';
import AuthRouter from '../pages/auth/router';

const Main = loadable(() => import('../pages/main'));

const routes = [
  {
    path: '/main',
    name: 'Dashboard',
    exact: true,
    component: Main,
    auth: [1],
  },
  ...AdminRouter,
  ...AuthRouter,
];

export default routes;
