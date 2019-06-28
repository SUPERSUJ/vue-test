<template>
  <div class="red">
    aa
    <bb></bb>
  </div>
</template>

<script>
import bb from './bb';
import cc from './cc';

export default {
  name: 'aa',
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
