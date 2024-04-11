import loadable from '../../utils/loadable';

const prePath = '/admin/';
const router = [
  {
    path: 'list',
    name: '管理员列表',
    component: loadable(() => import('./list')),
    auth: [1],
  },
  {
    path: 'add',
    name: '添加管理员',
    component: loadable(() => import('./add')),
    auth: [1],
  },
  {
    path: 'edit/:userId',
    name: '编辑管理员',
    component: loadable(() => import('./edit')),
    auth: [1],
  },
];

router.forEach((item) => {
  item.path = prePath + item.path;
});

export default router;
