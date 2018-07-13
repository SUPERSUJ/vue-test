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
      <el-table-column prop="user_group_name" label="用户组名" min-width="170"></el-table-column>
      <el-table-column prop="user_number" label="成员数" min-width="170"></el-table-column>
      <el-table-column prop="auth" label="权限" min-width="250"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="check(scope.row)">查看成员列表</el-button>
        </template>
      </el-table-column>
    </el-table>
    <m-pagination ref="page" :total="total" @handleFn="handleFn"></m-pagination>
  </el-row>
</template>

<script>
export default {
  name: 'userGroupList',
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
        this.tableData = this.mock.getUserGroupList.data;
        this.total = 9;
      }, 2000);
    },
    check() {},
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
