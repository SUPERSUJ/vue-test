<template>
  <div class="app-wrapper" :class="{hideSidebar: isActive}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <p-header></p-header>
      <el-row class="main">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-row>
    </div>
  </div>
</template>

<script>
import sidebar from './components/sidebar';
import pHeader from './components/pHeader';

export default {
  name: 'layout',
  computed: {
    isActive() {
      return this.$store.getters.sidebar.opened;
    },
  },
  components: {
    sidebar,
    pHeader,
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.main-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .main {
    flex: 1;
    box-sizing: border-box;
    padding: 10px;
    font-size: 14px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>

