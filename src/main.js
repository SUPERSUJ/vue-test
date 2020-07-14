// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'babel-polyfill';
import 'normalize.css/normalize.css';
import '@/styles/index.scss';
import { init, bind } from '@mixins/notifyVisibilityChange';
import App from './App';
import router from './router';
import './directive'; // 安装自定义指令
import './config/elementui';
import store from './store';
import './icons'; // 注册svg-icon组件
import mock from './mock';
import './components';

Vue.prototype.mock = mock;

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true;
}

init();

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

bind(vm);
