import Mock from 'mockjs';

const getAccountList = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'data|9': [{
    'account_uid': /\w{5,10}/,
    'account_name': '@ctitle(2,10)',
    'role_name|1': [
      '超级管理员',
      '客服',
      '运营',
      '大师',
    ],
    'create_time': '@date("yyyy-MM-dd hh-mm-ss")',
    'end_login_time': '@date("yyyy-MM-dd hh-mm-ss")',
    'use_status|1': [
      '0',
      '1',
    ],
  }],
});

export default {
  getAccountList,
};
