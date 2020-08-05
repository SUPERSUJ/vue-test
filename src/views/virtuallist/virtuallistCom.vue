<template>
  <div ref="list" class="infinite-list-container" @scroll.passive="scrollEvent">
    <!-- 下面这个div是撑起虚拟列表的总高度，使得list产生滚动条 -->
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
    // 列表所有数据
    allData: {
      type: Array,
      required: true,
    },
    // 每个数据块的高度
    itemSize: {
      type: Number,
      default: 200,
    },
    // 可视区域上下的缓冲数量
    bufferCount: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      // list可视区域高度
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
    // 可显示的列表项数，Math.ceil向上取整
    // 加this.bufferCount(10) 避免滑动过快,list 下方出现白屏
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemSize) + this.bufferCount;
    },
    // 偏移量对应的style
    getTransform() {
      return `translate3d(0, ${this.startOffset}px, 0)`;
    },
    // 获取真实显示列表数据
    visibleData() {
      let start = this.start >= this.bufferCount ? this.start - this.bufferCount : 0;
      let end = Math.min(this.end, this.allData.length);
      return this.allData.slice(start, end);
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
      // 此时的开始索引，注意是向下取整Math.floor
      this.start = Math.floor(scrollTop / this.itemSize);
      // 此时的结束索引
      this.end = this.start + this.visibleCount;
      // 这里是关键，infinite-list 的偏移量; infinite-list是绝对定位，不是fixed
      if (this.start < this.bufferCount) {
        this.startOffset = 0;
      } else {
        this.startOffset = scrollTop - (this.bufferCount * this.itemSize + scrollTop % this.itemSize);
      }
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
