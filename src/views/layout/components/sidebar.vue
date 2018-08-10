<template>
  <scroll-bar ref="scrollBar">
    <el-menu
      mode="vertical"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      class="menu"
      router>
      <template v-for="(item, index) in routes">
        <el-menu-item v-if="!item.children || item.children.length === 0" :key="index" :index="item.path">
          <svg-icon :icon-class="item.icon || 'reorder'"></svg-icon>
          <span slot="title">{{item.name || '无'}}</span>
        </el-menu-item>
        <el-submenu v-else :index="item.path" :key="index">
          <template slot="title">
            <svg-icon :icon-class="item.icon || 'reorder'"></svg-icon>
            <span slot="title">{{item.name || '无'}}</span>
          </template>
          <el-menu-item v-for="(child, i) in item.children" :key="i" :index="child.path">
            <svg-icon :icon-class="child.icon || 'reorder'"></svg-icon>
            <span>{{child.name || '无'}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </scroll-bar>
</template>

<script>
import ScrollBar from '@components/ScrollBar';

export default {
  name: 'sidebar',
  data() {
    return {
      defaultActive: this.$route.path,
      routes: [
        {
          name: '账号管理',
          path: '/account-list',
          children: [
            {
              name: '账号列表',
              path: '/account-list',
            },
            {
              name: '角色列表',
              path: '/role-list',
            },
          ],
        },
        {
          name: '用户管理',
          path: '/user-list',
          children: [
            {
              name: '用户列表',
              path: '/user-list',
            },
            {
              name: '用户组列表',
              path: '/user-group',
            },
          ],
        },
        {
          name: 'keepAliveMax',
          path: '/keep-alive-max',
        },
      ],
    };
  },
  computed: {
    isCollapse() {
      return this.$store.getters.sidebar.opened;
    },
  },
  components: {
    ScrollBar,
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.menu {
  .svg-icon {
    margin-right: 12px;
  }
}
.menu:not(.el-menu--collapse) {
  width: 180px;
}
</style>
