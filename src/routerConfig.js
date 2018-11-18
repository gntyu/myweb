// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UserForgetPassword from './pages/UserForgetPassword';
import UserLogin from './pages/UserLogin';
import Newslist from './pages/Newslist';
import Newapi from './pages/Newapi';

import Apilist from './pages/Apilist';
import UserRegister from './pages/UserRegister';

const routerConfig = [
  // {
  //   path: '/',
  //   layout: BasicLayout,
  //   component: Home,
  // },
  {
    path: '/home',
    layout: BasicLayout,
    component: Home,
  },
  {
    path: '/login',
    layout: UserLayout,
    component: UserLogin,
  },
  {
    path: '/register',
    layout: UserLayout,
    component: UserRegister,
  },
  {
    path: '/forgetpassword',
    layout: UserLayout,
    component: UserForgetPassword,
  },
  {
    path: '/newslist',
    layout: BasicLayout,
    component: Newslist,
  },
  {
    path: '/newapi',
    layout: BasicLayout,
    component: Newapi,
  },
  {
    path: '/apilist',
    layout: BasicLayout,
    component: Apilist,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routerConfig;
