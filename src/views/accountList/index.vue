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
      <el-table-column prop="role_name" label="角色" min-width="120"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" min-width="170"></el-table-column>
      <el-table-column prop="end_login_time" label="最后登录时间" min-width="170"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="250">
        <template slot-scope="scope">
          <el-button v-if="scope.row.use_status === '0'" type="text" size="small" @click="start(scope.row)">启用</el-button>
          <el-button v-else-if="scope.row.use_status === '1'" type="text" size="small" @click="stop(scope.row)">停用</el-button>
          <el-button type="text" size="small" @click="auth(scope.row)">授权</el-button>
          <el-button type="text" size="small" @click="resetPwd(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <m-pagination ref="page" :total="total" @handleFn="handleFn"></m-pagination>
    <!-- 重置密码 -->
    <el-dialog title="重置密码" :visible.sync="dialogReset" custom-class="small">
      <el-form :model="resetForm" label-width="80px" :rules="resetRules" ref="resetForm">
        <el-form-item label="原密码" prop="old_password">
          <el-input type="password" size="small" v-model.trim="resetForm.old_password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input type="password" size="small" v-model.trim="resetForm.new_password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="ok_password">
          <el-input type="password" size="small" v-model.trim="resetForm.ok_password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="level-center">
        <el-button :loading="resetLoad" size="small" type="primary" @click="resetSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!-- <test-com></test-com> -->
  </el-row>
</template>

<script>
export default {
  name: 'accountList',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.resetForm.ok_password !== '') {
          this.$refs.resetForm.validateField('ok_password');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetForm.new_password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        search: 'search',
      },
      loadTableData: false,
      tableData: [],
      total: 0,
      dialogReset: false,
      resetForm: {
        account_uid: '',
        old_password: '',
        new_password: '',
        ok_password: '',
      },
      resetRules: {
        old_password: [
          { required: true, message: '原密码不能为空', trigger: 'blur' },
        ],
        new_password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        ok_password: [
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
      resetLoad: false,
    };
  },
  watch: {
    $route: {
      handler() {
        console.log('this: ', this);
        console.log('this.$options: ', this.$options);
        console.log('this.$vnode: ', this.$vnode);
        console.log('this.$vnode.parent: ', this.$vnode.parent);
        console.log('this.$vnode.data.keepAlive: ', this.$vnode.data.keepAlive);
        console.log('this.$vnode.parent.componentInstance: ', this.$vnode.parent.componentInstance);
        console.log('this.$vnode.parent.componentInstance.cache: ', this.$vnode.parent.componentInstance.cache);
      },
      immediate: true,
    },
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loadTableData = true;
      window.setTimeout(() => {
        this.loadTableData = false;
        this.tableData = this.mock.getAccountList.data;
        this.total = 9;
      }, 2000);
    },
    start() {},
    stop() {},
    auth() {},
    resetPwd({ account_uid }) {
      this.resetForm.account_uid = account_uid;
      this.dialogReset = true;
    },
    search() {
      this.$refs.page.setData(1);
    },
    handleFn(obj) {
      Object.assign(this.form, obj);
      this.getTableData();
    },
    resetSubmit() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          this.$message.success('重置密码成功');
          Object.keys(this.resetForm)
            .forEach((key) => {
              this.resetForm[key] = '';
            });
          this.getTableData();
          this.dialogReset = false;
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
