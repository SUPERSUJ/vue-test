import Mock from 'mockjs';

const getUserList = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'data|9': [{
    'account_name': '@ctitle(2,6)',
    'phone_number': /1[0-9]{10}/,
    'create_time': '@date("yyyy-MM-dd hh-mm-ss")',
    'test_number|1-100': 100,
    'discuss_number|1-100': 100,
    'user_group': '@ctitle(2,10)',
    'use_status|1': [
      '0',
      '1',
    ],
  }],
});

export default {
  getUserList,
};
