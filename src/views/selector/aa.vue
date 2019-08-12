<template>
  <div class="red">
    aa
    <br>
    {{aaa}}
    <bb></bb>
    <button @click="update">forceUpdate</button>
  </div>
</template>

<script>
import bb from './bb';
import cc from './cc';

export default {
  name: 'aa',
  data() {
    this.aaa = '1';
    return {};
  },
  created() {
    console.log('aa created');
  },
  beforeUpdate() {
    console.log('aa beforeupdate');
  },
  updated() {
    console.log('aa updated');
  },
  mounted() {
    console.log('aa mounted');
    console.log('aa this: ', this);
  },
  methods: {
    update() {
      this.aaa += '1';
      this.$forceUpdate();
      // 只触发beforeUpdate 和 updated 钩子
    },
  },
  components: {
    bb,
    cc,
  },
};
</script>

<style lang="scss" scoped>
.red >>> .red {
  font-size: 20px;
}
</style>
