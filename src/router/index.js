import Vue from 'vue';
import Router from 'vue-router';
import index from '@/page/index';
import servicesIndex from '@/page/services/index';
import addFollow from '@/page/services/addFollow';

import manageIndex from '@/page/manage/index';
import centerIndex from '@/page/center/index';
import loginIndex from '@/page/center/login';
import registerIndex from '@/page/center/register';
import forgetIndex from '@/page/center/forget';

import infoIndex from '@/page/center/info/index';
import editEmail from '@/page/center/info/edit_email';
import editPhone from '@/page/center/info/edit_phone';
import editPassword from '@/page/center/info/edit_password';
import routeZhanghao from './zhanghao';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: { path: '/index' }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/addFollow',
      name: addFollow,
      component: addFollow,
    },
    {
      path: '/services/index',
      name: 'servicesIndex',
      component: servicesIndex,
    },
    {
      path: '/manage',
      name: 'manageIndex',
      component: manageIndex,
    },
    {
      path: '/center',
      name: 'centerIndex',
      component: centerIndex,
    },
    {
      path: '/center/login',
      name: 'loginIndex',
      component: loginIndex,
    },
    {
      path: '/center/register',
      name: 'registerIndex',
      component: registerIndex,
    },
    {
      path: '/center/forget',
      name: 'forgetIndex',
      component: forgetIndex,
    },
    {
      path: '/center/info',
      name: 'infoIndex',
      component: infoIndex,
    },
    {
      path: '/center/info/editEmail',
      name: 'editEmail',
      component: editEmail,
    },
    {
      path: '/center/info/editPhone',
      name: 'editPhone',
      component: editPhone,
    },
    {
      path: '/center/info/editPassword',
      name: 'editPassword',
      component: editPassword,
    },
  ].concat(routeZhanghao),
});
