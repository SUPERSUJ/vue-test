import Mock from 'mockjs';

const getRoleList = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'data|9': [{
    'role_uid': /\w{5,10}/,
    'role_name|1': [
      '超级管理员',
      '客服',
      '运营',
      '大师',
    ],
    'create_time': '@date("yyyy-MM-dd hh-mm-ss")',
    'description': '@ctitle(2,20)',
  }],
});

const addRole = {
  data: {
    code: 200,
  },
};

export default {
  getRoleList,
  addRole,
};
