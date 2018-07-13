<template>
  <el-row class="login">
    <div class="login-head-bg"></div>
    <el-form :model="form" :rules="formRules" ref="form" label-width="0px" class="login-form">
      <el-form-item prop="account">
        <el-input v-model="form.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" style="width: 100%;">提交</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        account: '',
        password: '',
      },
      formRules: {},
    };
  },
  methods: {
    submit() {
      this.$router.push({
        path: '/account-list',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  background: #FFFFFF;
  border-radius: 5px;
}
.login-head-bg {
  height: 130px;
  background: no-repeat url(../../assets/imgs/login-head-bg.jpg);
  background-size: 100% 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.login-form {
  padding: 10px 20px;
}
</style>
