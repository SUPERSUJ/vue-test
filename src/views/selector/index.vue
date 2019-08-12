<template>
  <div>
    <aa></aa>
    <test-key></test-key>
    <test-is></test-is>
    <test-animation></test-animation>
  </div>
</template>

<script>
import aa from './aa';
import bb from './bb';
import cc from './cc';
import testKey from './testKey';
import testIs from './testIs';
import testAnimation from './testAnimation';

export default {
  name: 'selector',
  components: {
    aa,
    bb,
    cc,
    testKey,
    testIs,
    testAnimation,
  },
};
</script>

<style lang="scss" scoped>

</style>
