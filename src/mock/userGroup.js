import Mock from 'mockjs';

const getUserGroupList = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'data|9': [{
    'user_group_name': '@ctitle(2,6)',
    'user_number|1-1000': 1000,
    'auth|1': [
      '包含所有权限',
      '部分权限',
      '没有权限',
    ],
  }],
});

export default {
  getUserGroupList,
};
