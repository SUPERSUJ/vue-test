<template>
  <div>
    <h2>拖拽</h2>
    <drag-item v-for="(item, index) in data" :key="index" @changeDraging="changeDraging">{{item.text}}</drag-item>
  </div>
</template>

<script>
import dragItem from './dragItem';

export default {
  name: 'drag',
  data() {
    return {
      draging: null,
      data: [{
        id: 1,
        text: 1,
      }, {
        id: 2,
        text: 2,
      }, {
        id: 3,
        text: 3,
      }, {
        id: 4,
        text: 4,
      }, {
        id: 5,
        text: 5,
      }, {
        id: 6,
        text: 6,
      }, {
        id: 7,
        text: 7,
      }, {
        id: 8,
        text: 8,
      }],
    };
  },
  watch: {
    data: {
      handler(val) {
        console.log('data: ', val);
      },
      deep: true,
    },
  },
  methods: {
    changeDraging(val) {
      console.log('changeDraging val: ', val);
    },
  },
  components: {
    dragItem,
  },
};
</script>
