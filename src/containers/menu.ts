import { MenuItem } from '../typings/menu'

const menu: MenuItem[] = [
  {
    key: '/main',
    title: '首页',
    icon: 'icondashboard'
  },
  {
    title: '系统管理',
    key: '/user',
    icon: 'iconyonghuguanli1',
    subs: [
      { title: '用户列表', key: '/admin/list', icon: '' },
    ]
  },
]

export default menu
