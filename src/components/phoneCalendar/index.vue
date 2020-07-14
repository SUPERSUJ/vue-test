<template>
  <div
    ref="phoneCalendar"
    class="box"
    @touchstart="touchStart"
    @touchmove.stop.prevent="touchMove"
    @touchend="touchEnd">
    <div
      class="content"
      :style="{'transform': `translate3d(${-translateIndex*100}%, 0, 0)`}">
      <div
        v-for="(item, index) in calendarOfMonthShow"
        :key="index"
        class="item"
        :style="{
          transform: `translate3d(${(index-1+translateIndex + (isTouching ? touch.x : 0))*100}%, 0, 0)`,
          transitionDuration: `${isTouching ? 0 : transitionDuration}s`,
        }">
        <div
          v-for="(date, i) in item"
          :key="i"
          class="date-item"
          :class="setDateItemClass(date)">
          {{date.text}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getThreeMonthDates, { addZero } from '@js/calendar';

export default {
  name: 'phoneCalendar',
  data() {
    this.touchStartPositionX = null; // 开始滑动x轴的值
    this.touchStartPositionY = null; // 开始滑动时y轴的值
    let currTime = new Date();
    let year = currTime.getFullYear();
    let month = currTime.getMonth();
    let date = currTime.getDate();
    this.currTime = {
      year,
      month,
      date,
    };
    this.currTimeStr = `${year}${addZero(month)}${addZero(date)}`;
    console.log('this.currTimeStr: ', this.currTimeStr);
    return {
      calendarOfMonthShow: getThreeMonthDates(currTime),
      translateIndex: 0, // 用于计算上下偏移的距离
      transitionDuration: 0.3, // 动画持续时间
      touch: {
        x: 0,
        y: 0,
      }, // 本次touch事件，横向，纵向滑动的距离
      isTouching: false, // 是否正在滑动
    };
  },
  methods: {
    touchStart(e) {
      let touches_0 = e.touches[0];
      this.touchStartPositionX = touches_0.clientX;
      this.touchStartPositionY = touches_0.clientY;
      this.touch.x = 0;
      this.touch.y = 0;
      this.isTouching = true;
    },
    touchMove(e) {
      let touches_0 = e.touches[0];
      let diffX = touches_0.clientX - this.touchStartPositionX; // 负数 手势往左
      this.touch.x = diffX / this.$refs.phoneCalendar.offsetWidth;
    },
    touchEnd() {
      this.isTouching = false;
      if (Math.abs(this.touch.x) > 0.2) {
        if (this.touch.x > 0) { // 手势往右边 上个月
          this.translateIndex++;
        } else { // 手势往左边 下个月
          this.translateIndex--;
        }
        this.toMonth();
      }
    },
    toMonth() {
      this.calendarOfMonthShow.splice(0, 3, ...getThreeMonthDates(new Date(this.currTime.year, this.currTime.month - this.translateIndex, 1)));
    },
    setDateItemClass(item) {
      let str = `${item.year}${item.month}${item.date}`;
      if (str === this.currTimeStr) {
        return ['curr-date'];
      } else if (str > this.currTimeStr) {
        return ['future-date'];
      }
      return [];
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: relative;
  width: 500px;
  height: 500px;
  margin: auto;
  background: #eeeeee;
  overflow: hidden;
}

.content {
  width: 100%;
  height: 100%;
}

.item {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.date-item {
  display: inline-block;
  width: 14.284%;
  height: 83.33px;
  font-size: 18px;
  line-height: 83.33px;
  text-align: center;
  overflow: hidden;
}

.curr-date {
  background-color: #1c71fb;
}

.future-date {
  background-color: #ffffff;
}
</style>
