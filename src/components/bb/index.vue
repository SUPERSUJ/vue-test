<template>
  <div>
    {{text}}
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bb',
  data() {
    return {
      text: '',
    };
  },
  created() {
    this.$on('on-up', function (a) {
      this.text = a;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
