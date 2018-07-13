<template>
  <div class="header">
    <div class="hamburger" @click="toggleShowNav">
      <div class="hamburger-main" :class="{'is-active': isActive}">
        <svg-icon icon-class="fold"></svg-icon>
      </div>
    </div>
    <bread></bread>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click" szie="mini">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" src="../../../assets/imgs/avatar.jpg" width="50" height="50"> -->
          <span class="user-name">Messi</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bread from './bread';

export default {
  name: 'pHeader',
  computed: {
    isActive() {
      return !this.$store.getters.sidebar.opened;
    },
  },
  methods: {
    toggleShowNav() {
      this.$store.dispatch('toggle_sidebar');
    },
    logout() {
      this.$confirm('你确定退出登录么?', '确认退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$router.push({
          path: '/login',
        });
      });
    },
  },
  components: {
    bread,
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);

  .hamburger {
    float: left;
    box-sizing: border-box;
    width: 50px;
    height: 50px;

    .hamburger-main {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 10px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      transform: rotate(90deg);
      transition: .38s;
      transform-origin: 50% 50%;
      &.is-active {
        transform: rotate(0deg);
      }
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        color: #000000;
        // .user-avatar {
        //   width: 40px;
        //   height: 40px;
        //   border-radius: 10px;
        // }
        .user-name{
          font-size: 16px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
