import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const login = (r) => require.ensure([], () => r(require('@views/login')), 'login');
const layout = (r) => require.ensure([], () => r(require('@views/layout')), 'layout');
const accountList = (r) => require.ensure([], () => r(require('@views/accountList')), 'accountList');
const roleList = (r) => require.ensure([], () => r(require('@views/roleList')), 'roleList');
const userList = (r) => require.ensure([], () => r(require('@views/userList')), 'userList');
const userGroupList = (r) => require.ensure([], () => r(require('@views/userGroupList')), 'userGroupList');
const keepAliveMax = (r) => require.ensure([], () => r(require('@views/keepAliveMax')), 'keepAliveMax');
const vueHooks = (r) => require.ensure([], () => r(require('@views/vueHooks')), 'vueHooks');
const emitter = (r) => require.ensure([], () => r(require('@views/emitter')), 'emitter');
const sForm = (r) => require.ensure([], () => r(require('@views/sForm')), 'sForm');
const checkbox = (r) => require.ensure([], () => r(require('@views/checkbox')), 'checkbox');
const display = (r) => require.ensure([], () => r(require('@views/display')), 'display');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/',
      name: '首页',
      component: layout,
      children: [
        {
          path: 'account-list',
          name: '账号列表',
          component: accountList,
          meta: {
            keepAlive: true,
          },
        },
        {
          path: 'role-list',
          name: '角色列表',
          component: roleList,
        },
        {
          path: 'user-list',
          name: '用户列表',
          component: userList,
        },
        {
          path: 'user-group',
          name: '用户组列表',
          component: userGroupList,
        },
        {
          path: 'keep-alive-max',
          name: 'keepAliveMax',
          component: keepAliveMax,
        },
        {
          path: 'vue-hooks',
          name: 'vueHooks',
          component: vueHooks,
        },
        {
          path: 'emitter',
          name: 'emitter',
          component: emitter,
        },
        {
          path: 'sForm',
          name: 'sForm',
          component: sForm,
        },
        {
          path: 'checkbox',
          name: 'checkbox',
          component: checkbox,
        },
        {
          path: 'display',
          name: 'display',
          component: display,
        },
      ],
    },
  ],
});
