<template>
  <div class="app-wrapper" :class="{hideSidebar: isActive}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <p-header></p-header>
      <el-row class="main">
        <!-- <div>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div> -->
        <transition name="fade">
          <router-view class="view"></router-view>
        </transition>
        <!-- <router-view></router-view> -->
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
  mounted() {
    console.log('layout: ', this);
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

.fade-enter,
.fade-leave-to {
  transform: translateX(50px);
}

.view {
  position: absolute;
  width: 100%;
  transition: transform .3s ease-out;
}
</style>

