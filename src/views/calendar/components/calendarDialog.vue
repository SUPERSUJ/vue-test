<template>
  <div>
    <div>
      <div
        @touchstart="touchStart"
        @touchmove.stop.prevent="touchMove"
        @touchend="touchEnd"
        class="calendar-dates">
        <ul :style="{
          'transform': `translate3d(${-translateIndex * 100}%, 0, 0)`,
        }">
          <li
            v-for="(item, i) in dates"
            :key="i"
            :style="{
              'transform': `translate3d(${(i - 1 + translateIndex + touch.x) * 100}%, 0, 0)`
            }"
            class="calendar-dates-item">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
    <button @click="add">+</button>
    <button @click="remove">-</button>{{translateIndex}}
  </div>
</template>

<script>
export default {
  name: 'calendarDialog',
  data() {
    return {
      translateIndex: 0,
      dates: ['ada', 'ccc', 'zz'],
      touch: {
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    add() {
      this.translateIndex++;
    },
    remove() {
      this.translateIndex--;
    },
    touchStart(e) {
      this.touchStartPositionX = e.touches[0].clientX;
      this.touchStartPositionY = e.touches[0].clientY;
      this.touch.x = 0;
      this.touch.y = 0;
    },
    touchMove(e) {
      console.log('touchMove');
      let moveX = e.touches[0].clientX - this.touchStartPositionX;
      let moveY = e.touches[0].clientY - this.touchStartPositionY;
      if (Math.abs(moveX) > Math.abs(moveY)) {
        this.touch.x = moveX / 500;
      }
      console.log('moveX: ', moveX);
      console.log('this.touch.x: ', this.touch.x);
    },
    touchEnd(e) {
      console.log('touchEnd e: ', e);
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  height: 100%;
  border: 0;
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

li:nth-child(1) {
  background: #ff0000;
}

li:nth-child(2) {
  background: gold;
}

li:nth-child(3) {
  background: brown;
}

.calendar-dates {
  position: relative;
  display: inline-block;
  width: 500px;
  height: 500px;
  overflow: hidden;
}

.calendar-dates-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: gold;
  transition-duration: .3s;
  will-change: transform;
}
</style>
