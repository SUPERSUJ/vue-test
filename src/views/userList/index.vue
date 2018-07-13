<template>
  <el-row>
    <el-form :inline="true" :model="form" @submit.native.prevent>
      <el-form-item label="">
        <el-input size="small" v-model.trim="form.search" @keyup.enter.native="search">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table v-loading="loadTableData" :data="tableData">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="account_name" label="用户名" min-width="120"></el-table-column>
      <el-table-column prop="phone_number" label="手机号" min-width="120"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" min-width="170"></el-table-column>
      <el-table-column prop="test_number" label="求测次数" min-width="120"></el-table-column>
      <el-table-column prop="discuss_number" label="论卦次数" min-width="120"></el-table-column>
      <el-table-column prop="user_group" label="用户组" min-width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.use_status === '0'" type="primary" size="small" @click="start(scope.row)">启用</el-button>
          <el-button v-else-if="scope.row.use_status === '1'" type="danger" size="small" @click="stop(scope.row)">停用</el-button>
          <el-button type="primary" size="small" @click="modify(scope.row)">授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <m-pagination ref="page" :total="total" @handleFn="handleFn"></m-pagination>
  </el-row>
</template>

<script>
export default {
  name: 'userList',
  data() {
    return {
      form: {
        search: '',
      },
      loadTableData: false,
      tableData: [],
      total: 0,
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loadTableData = true;
      window.setTimeout(() => {
        this.loadTableData = false;
        this.tableData = this.mock.getUserList.data;
        this.total = 9;
      }, 2000);
    },
    start() {},
    stop() {},
    modify() {},
    search() {
      this.$refs.page.setData(1);
    },
    handleFn(obj) {
      Object.assign(this.form, obj);
      this.getTableData();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
