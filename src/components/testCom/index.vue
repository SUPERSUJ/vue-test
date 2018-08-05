<template>
  <div>
    testCom-div
  </div>
</template>

<script>
export default {
  name: 'testCom',
  mounted() {
    console.log('testComs.$vnode.parent: ', this.$vnode);
  },
};
</script>
