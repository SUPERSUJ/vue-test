import Vue from 'vue';
import openViewPhoto from '@components/viewPhoto';

// 图片查看指令
Vue.directive('view', {
  inserted(el) {
    el.addEventListener('click', openViewPhoto);
  },
  unbind(el) {
    el.removeEventListener('click', openViewPhoto);
  },
});
