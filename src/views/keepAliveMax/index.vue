<template>
  <div>
    <h4>keep-alive的max</h4>
    <ul>
      <li @click="n='aa'">A组件</li>
      <li @click="n='bb'">B组件</li>
      <li @click="n='cc'">C组件</li>
    </ul>
    <div>
      <keep-alive max="2">
        <component :is="n"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'keepAliveMax',
  data() {
    return {
      n: 'aa',
    };
  },
  components: {
    aa: {
      template: '<div>a</div>',
      created() {
        console.log('aa created');
      },
      destroyed() {
        console.log('aa destroyed');
      },
    },
    bb: {
      template: '<div>bbb</div>',
      created() {
        console.log('bb created');
      },
      destroyed() {
        console.log('bb destroyed');
      },
    },
    cc: {
      template: '<div>ccc</div>',
      created() {
        console.log('cc created');
      },
      destroyed() {
        console.log('cc destroyed');
      },
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
</style>
