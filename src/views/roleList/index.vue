<template>
  <el-row>
    <el-form :inline="true" :model="form" @submit.native.prevent>
      <el-form-item label="">
        <el-input size="small" v-model.trim="form.search" @keyup.enter.native="search">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" @click="add">添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loadTableData" :data="tableData">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="role_name" label="角色名" min-width="120"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" min-width="170"></el-table-column>
      <el-table-column prop="description" label="描述" min-width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="auth(scope.row)">授权</el-button>
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <m-pagination ref="page" :total="total" @handleFn="handleFn"></m-pagination>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="dialogAdd" custom-class="small">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="角色名称">
          <el-input size="small" v-model.trim="addForm.role_name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input size="small" v-model.trim="addForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="level-center">
        <el-button :loading="addLoad" size="small" type="primary" @click="addSubmit">提交</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: 'roleList',
  data() {
    return {
      form: {
        search: '',
      },
      loadTableData: false,
      tableData: [],
      total: 0,
      dialogAdd: false,
      addForm: {
        role_uid: '',
        role_name: '',
        description: '',
      },
      addLoad: false,
    };
  },
  created() {
    this.getTableData();
  },
  mounted() {
    console.log('this: ', this);
    console.log('this.$options: ', this.$options);
    console.log('this.$vnode: ', this.$vnode);
    console.log('this.$vnode.parent: ', this.$vnode.parent);
    console.log('this.$vnode.data.keepAlive: ', this.$vnode.data.keepAlive);
    console.log('this.$vnode.parent.componentInstance: ', this.$vnode.parent.componentInstance);
    console.log('this.$vnode.parent.componentInstance.cache: ', this.$vnode.parent.componentInstance.cache);
  },
  methods: {
    getTableData() {
      this.loadTableData = true;
      window.setTimeout(() => {
        this.loadTableData = false;
        this.tableData = this.mock.getRoleList.data;
        this.total = 9;
      }, 2000);
    },
    auth() {},
    del() {},
    search() {
      this.$refs.page.setData(1);
    },
    handleFn(obj) {
      Object.assign(this.form, obj);
      this.getTableData();
    },
    add() {
      this.dialogAdd = true;
    },
    addSubmit() {
      if (this.mock.addRole.data.code === 200) {
        this.$message.success('添加成功');
        Object.keys(this.addForm)
          .forEach((key) => {
            this.addForm[key] = '';
          });
        this.dialogAdd = false;
        this.getTableData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
