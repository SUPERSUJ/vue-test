<template>
  <div>{{text}}</div>
</template>

<script>
export default {
  name: 'cc',
  data() {
    return {
      text: '',
    };
  },
  created() {
    this.$on('on-down', function (a) {
      this.text = a;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
