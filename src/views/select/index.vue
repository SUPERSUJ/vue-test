<template>
  <el-row>
    <div>select</div>
    <scroll-request-select v-model="val"></scroll-request-select>
  </el-row>
</template>

<script>
import scrollRequestSelect from '@components/scrollRequestSelect';

export default {
  name: 'select',
  data() {
    return {
      val: '',
    };
  },
  components: {
    scrollRequestSelect,
  },
};
</script>

<style lang="scss" scoped>
</style>
