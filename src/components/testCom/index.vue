<template>
  <div>
    testCom-div
  </div>
</template>

<script>
export default {
  name: 'testCom',
  mounted() {
    console.log('testComs.parent: ', this.$parent.$parent);
  },
};
</script>
