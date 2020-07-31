<template>
  <div>
    <virtuallist-com :allData="allData" :itemSize="itemSize">
      <!-- <span slot-scope="{ item }">
        {{item.name}}
      </span> -->
    </virtuallist-com>
  </div>
</template>

<script>
import virtuallistCom from './virtuallistCom';

export default {
  name: 'virtuallist',
  data() {
    return {
      allData: Array(300).fill(0).map((item, i) => ({ name: i, id: i })),
      itemSize: 100,
    };
  },
  components: {
    virtuallistCom,
  },
};
</script>

<style lang="scss" scoped>

</style>
