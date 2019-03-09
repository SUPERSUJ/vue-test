<template>
  <div>
    <!-- .prevent加了，滚动条不会动 -->
    <div @scroll="handleScroll" style="height: 400px; overflow: auto; position: relative;">
      <div class="section-1"></div>
      <div id="section-2">Scroll past this div</div>
      <div class="section-3"></div>
    </div>
    <div ref="scrollWrap" class="scroll-wrap">
      <div ref="scrollContent" @wheel.prevent="barWheel" :style="{ left: left + 'px' }" class="scroll-content">
        <div class="scroll-item" v-for="i in n" :key="i">
          {{i + '000000'}}
        </div>
      </div>
    </div>
    <button @click="increase">n+</button>
    <div>{{n}}</div>
    <scroll-img></scroll-img>
  </div>
</template>

<script>
import scrollImg from './components/scrollImg';

const MT = 15;
// wheel、mousewheel、和DOMMouseScroll则是“滚轮事件”。
// 这有什么不同呢？
// scroll检测的是滚动条的滚动，当滚动条不能滚动（到顶或到底）时
// scroll便不再触发。而滚轮事件则不同，它监测的是鼠标滚轮是否滚动
// 只要在滚动，便会触发。scroll的默认滚动行为是不能禁止的,
// 而滚轮事件则可以阻止默认行为(event.preventDefault())。
// scroll 事件的e是没有wheelDelta属性

// 4个window对象下：scrollX、scrollY、scrollTo、scroll（作用和scrollTo一样）
// 4个Element对象下：scrollWidth、scrollHeight、scrollLeft、scrollTop

export default {
  name: 'scroll',
  data() {
    return {
      timer: null,
      left: 0,
      n: 20,
    };
  },
  methods: {
    handleScroll(e) {
      console.log(e);
      const target = e.currentTarget; // 注意
      const eventDelta = e.wheelDelta || -e.deltaY * 3;
      console.log(Math.sign(eventDelta)); // 正 返回1，负，返回-1
      console.log(eventDelta);
      const section2 = target.querySelector('#section-2');
      console.log(section2);
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(function() {
        let diff = section2.offsetTop - target.clientHeight;
        console.log('diff: ', diff);
        console.log('target.scrollTop: ', target.scrollTop);
        if (target.scrollTop >= diff) {
          console.log(true);
        }
      }, 100);
    },
    barWheel(e) {
      let eventDelta = e.wheelDelta || -e.deltaY * 3;
      console.log('eventDelta: ', eventDelta);
      let scrollWrap = this.$refs.scrollWrap;
      let scrollContent = this.$refs.scrollContent;
      let scrollWrapOffsetW = scrollWrap.offsetWidth;
      let scrollContentOffsetW = scrollContent.offsetWidth;
      console.log('scrollWrapOffsetW: ', scrollWrapOffsetW);
      console.log('scrollContentOffsetW: ', scrollContentOffsetW);

      // scrollContentOffsetW + MT 把这个“和”看做内部的整个宽度，因为右边始终要留一个MT的距离
      if (scrollContentOffsetW + MT <= scrollWrapOffsetW) {
        this.left = 0;
      } else {
        console.log('this.left: ', this.left);
        console.log('(scrollWrapOffsetW - (scrollWrapOffsetW + MT)): ', (scrollWrapOffsetW - (scrollWrapOffsetW + MT)));
        console.log('this.left + eventDelta', this.left + eventDelta);
        if (eventDelta > 0) { // 向右移
          this.left = Math.min(0, this.left + eventDelta);
          console.log('右移 this.left: ', this.left);
        } else {
          this.left = Math.max(this.left + eventDelta, (scrollWrapOffsetW - (scrollContentOffsetW + MT)));
          console.log('左移 this.left: ', this.left);
        }
      }
    },
    increase() {
      this.n++;
    },
  },
  components: {
    scrollImg,
  },
};
</script>

<style lang="scss" scoped>
$m_l: 15px;

.section-1 {
  height: 900px;
  width: 100%;
  background: green;
}

.section-3 {
  height: 400px;
  width: 100%;
  background: orange;
}

.scroll-wrap {
  margin: 10px 0;
  border: 1px solid greenyellow;
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  height: 30px;
  .scroll-content {
    position: absolute;
    transition: all .3s;
    .scroll-item {
      display: inline-block;
      background: #000;
      color: #fff;
      line-height: 30px;
      font-size: 20px;
      margin-left: $m_l;
    }
  }
}
</style>
