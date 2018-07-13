<template>
  <div class="bread">
    <el-breadcrumb separator="/" class="bread-main">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"><span :class="{'bread-name': index < getLastIndex}">{{item.name}}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'bread',
  computed: {
    getLastIndex() {
      return this.$route.matched.length - 1;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bread {
    float: left;
    height: 50px;

    .position {
      margin: 5px 8px 0 0;
      width: 20px;
      height: 20px;
    }

    .bread-main {
      line-height: 50px;

      .bread-name {
        color: #000000;
        cursor: pointer;
      }
    }
  }

  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
