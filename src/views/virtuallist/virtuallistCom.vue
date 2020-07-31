<template>
  <div ref="list" class="infinite-list-container" @scroll.passive="scrollEvent">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }">23424</div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        ref="items"
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{
          height: itemSize + 'px',
        }">
        {{item.name}}
        <!-- <slot :item="item"></slot> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'virtuallistCom',
  props: {
    allData: {
      type: Array,
      required: true,
    },
    itemSize: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      // 可视区域高度
      screenHeight: 0,
      // 偏移量
      startOffset: 0,
      // 起始索引
      start: 0,
      // 结束索引
      end: null,
    };
  },
  computed: {
    // 列表总高度
    listHeight() {
      return this.allData.length * this.itemSize;
    },
    // 可显示的列表项数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemSize) + 10;
    },
    // 偏移量对应的style
    getTransform() {
      return `translate3d(0, ${this.startOffset}px, 0)`;
    },
    // 获取真实显示列表数据
    visibleData() {
      return this.allData.slice(this.start, Math.min(this.end, this.allData.length));
    },
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  methods: {
    scrollEvent() {
      // 当前滚动位置
      let scrollTop = this.$refs.list.scrollTop;
      // 此时的开始索引
      this.start = Math.floor(scrollTop / this.itemSize);
      // 此时的结束索引
      this.end = this.start + this.visibleCount;
      // 此时偏移量
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
    },
  },
};
</script>

<style lang="scss" scoped>

.infinite-list-container {
  position: relative;
  width: 500px;
  height: 500px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #eeeeee;
}

.infinite-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 500px;
  background: #ffffff;
}

.infinite-list-item {
  padding: 10px;
  color: #ffffff;
  box-sizing: border-box;
  background: grey;
  border-bottom: 1px solid greenyellow;
}
</style>
