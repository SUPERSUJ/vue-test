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
const select = (r) => require.ensure([], () => r(require('@views/select')), 'select');
const render = (r) => require.ensure([], () => r(require('@views/render')), 'render');
const scroll = (r) => require.ensure([], () => r(require('@views/scroll')), 'scroll');
const zoomImg = (r) => require.ensure([], () => r(require('@views/zoomImg')), 'zoomImg');
const calendar = (r) => require.ensure([], () => r(require('@views/calendar')), 'calendar');
const css = (r) => require.ensure([], () => r(require('@views/css')), 'css');
const animation = (r) => require.ensure([], () => r(require('@views/animation')), 'animation');
const selector = (r) => require.ensure([], () => r(require('@views/selector')), 'selector');
const drag = (r) => require.ensure([], () => r(require('@views/drag')), 'drag');
const buttoncss = (r) => require.ensure([], () => r(require('@views/buttoncss')), 'buttoncss');
const imgs = (r) => require.ensure([], () => r(require('@views/imgs')), 'imgs');
const filters = (r) => require.ensure([], () => r(require('@views/filters')), 'filters');
const virtuallist = (r) => require.ensure([], () => r(require('@views/virtuallist')), 'virtuallist');

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
          name: 'accountList',
          component: accountList,
          meta: {
            keepAlive: true,
          },
        },
        // {
        //   path: 'role-list',
        //   name: 'roleList',
        //   component: roleList,
        // },
        {
          path: 'role-list/:id',
          name: 'roleList',
          component: roleList,
        },
        {
          path: 'role-list',
          name: 'roleList',
          component: roleList,
        },
        {
          path: 'user-list',
          name: 'userList',
          component: userList,
        },
        {
          path: 'user-group',
          name: 'userGroupList',
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
        {
          path: 'select',
          name: 'select',
          component: select,
        },
        {
          path: 'render',
          name: 'render',
          component: render,
        },
        {
          path: 'scroll',
          name: 'scroll',
          component: scroll,
        },
        {
          path: 'zoomImg',
          name: 'zoomImg',
          component: zoomImg,
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: calendar,
        },
        {
          path: 'css',
          name: 'css',
          component: css,
        },
        {
          path: 'animation',
          name: 'animation',
          component: animation,
        },
        {
          path: 'selector',
          name: 'selector',
          component: selector,
        },
        {
          path: 'drag',
          name: 'drag',
          component: drag,
        },
        {
          path: 'buttoncss',
          name: 'buttoncss',
          component: buttoncss,
        },
        {
          path: 'imgs',
          name: 'imgs',
          component: imgs,
        },
        {
          path: 'filters',
          name: 'filters',
          component: filters,
        },
        {
          path: 'virtuallist',
          name: 'virtuallist',
          component: virtuallist,
        },
      ],
    },
  ],
});
