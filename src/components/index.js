// 全局安装自定义组件
import Vue from 'vue';
import mPagination from './mPagination';
import testCom from './testCom';

Vue.component(mPagination.name, mPagination); // 分页
Vue.component(testCom.name, testCom);
