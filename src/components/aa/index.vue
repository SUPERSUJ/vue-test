<template>
  <div>
    <el-button @click="up" size="small">up</el-button>
    <el-button @click="down" size="small">down</el-button>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import emitter from '@js/emitter';

export default {
  name: 'aa',
  data() {
    return {
      n: 1,
    };
  },
  mixins: [emitter],
  methods: {
    up() {
      this.n++;
      this.dispatch('bb', 'on-up', this.n);
    },
    down() {
      this.n--;
      this.broadcast('cc', 'on-down', this.n);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
