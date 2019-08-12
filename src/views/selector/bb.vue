<template>
  <div class="red">
    bb
    <div :text-content.prop="text"></div>
    <div v-text="text1"></div>
    <cc></cc>
  </div>
</template>

<script>
import aa from './aa';
import cc from './cc';

export default {
  name: 'bb',
  data() {
    return {
      text: 'text',
      text1: 'text1',
    };
  },
  created() {
    console.log('bb created');
  },
  beforeUpdate() {
    console.log('bb beforeUpdate');
  },
  updated() {
    console.log('bb updated');
  },
  components: {
    aa,
    cc,
  },
};
</script>

<style lang="scss" scoped>

</style>
