<template>
  <div class="picker-row">
    <div class="picker-col">
      <div
        class="picker-col-wrapper"
        :style="{
          'transition-duration': isTouchEnd ? '.5s' : '0s',
          'transform': 'translate3d(0, ' + (90 - offsetY) + 'px, 0)'
        }"
        @touchstart="touchstart"
        @touchmove.stop.prevent="touchmove"
        @touchend="touchend">
        <div
          v-for="(item, index) in cols[0]"
          :key="index"
          class="picker-item">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="picker-line picker-line-top"></div>
    <div class="picker-line picker-line-bottom"></div>
  </div>
</template>

<script>
function getItemIndex(id, arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    if (item.id === id) {
      return i;
    }
  }
  return -1;
}

export default {
  name: 'picker',
  data() {
    return {
      cols: [
        new Array(1).fill().map((_, i) => {
          let year = i + 2019 + '';
          return {
            id: year,
            name: year,
          };
        }),
      ],
      isTouchEnd: false,
      offsetY: 0,
      stopInertiaMove: true,
      touchStartY: 0,
      colIndex: 0,
      lastMoveStart: 0,
      lastMoveTime: 0,
      initPos: 0,
    };
  },
  created() {
    this.init(['2019']);
  },
  methods: {
    init(defaultData) {
      for (let i = 0, len = defaultData.length; i < len; i++) {
        let id = defaultData[i];
        let idx = getItemIndex(id, this.cols[i]);
        if (idx !== -1) {
          this.offsetY = 36 * idx;
          this.initPos = this.offsetY;
        }
      }
    },
    touchstart(e) {
      this.isTouchEnd = false;
      this.touchStartY = e.touches[0].pageY;
      // 惯性
      this.stopInertiaMove = true;
      this.lastMoveStart = this.touchStartY;
      this.lastMoveTime = Date.now();
    },
    touchmove(e) {
      this.isTouchEnd = false;
      let touchMoveY = e.touches[0].pageY;
      // 公式推导
      // 当initPos为0, touchMoveY - this.touchStartY + 90 = translate
      // 当initPos为36, touchMoveY - this.touchStartY + 90 - initPos = translate
      // translate = 90 - (this.touchStartY - touchMoveY + this.initPos)
      this.offsetY = this.touchStartY - touchMoveY + this.initPos;
      if (this.offsetY < -36) {
        this.offsetY = -36;
      }
      if (this.offsetY > 36 * this.cols[this.colIndex].length) {
        this.offsetY = 36 * this.cols[this.colIndex].length;
      }
      // 惯性
      let nowTime = Date.now();
      this.stopInertiaMove = true;
      if (nowTime - this.lastMoveTime > 300) {
        this.lastMoveTime = nowTime;
        this.lastMoveStart = this.offsetY;
      }
    },
    touchend(e) {
      let touchEndY = e.changedTouches[0].pageY;
      let touchChangedY = this.touchStartY - touchEndY + this.initPos;
      let touchMovedY = touchChangedY % 36 > 36 / 2 ? Math.ceil(touchChangedY / 36) * 36 : Math.floor(touchChangedY / 36) * 36;
      if (touchMovedY < 0) {
        this.isTouchEnd = true;
        this.offsetY = 0;
        this.initPos = this.offsetY;
        return;
      }
      if (touchMovedY > (this.cols[this.colIndex].length - 1) * 36) {
        this.isTouchEnd = true;
        this.offsetY = (this.cols[this.colIndex].length - 1) * 36;
        this.initPos = this.offsetY;
        return;
      }
      let nowTime = Date.now();
      let v = (touchEndY - this.lastMoveStart) / (nowTime - this.lastMoveTime);
      this.stopInertiaMove = false;
      let dir = v > 0 ? -1 : 1;
      let deceleration = dir * 0.01;
      let duration = v / deceleration;
      let dist = v * duration / 2;
      let inertiaMove = () => {
        if (this.stopInertiaMove) {
          return;
        }
        if (Math.abs(dist) < 0.5) {
          this.isTouchEnd = true;
          this.offsetY = Math[touchMovedY % 36 > 18 ? 'ceil' : 'floor'](touchMovedY / 36) * 36;
          this.initPos = this.offsetY;
          return;
        }
        this.offsetY = touchMovedY + dist;
        dist /= 1.1;
        touchMovedY += dist;
        if (touchMovedY < 0) {
          touchMovedY = 0;
        }
        if (touchMovedY > (this.cols[this.colIndex].length - 1) * 36) {
          touchMovedY = (this.cols[this.colIndex].length - 1) * 36;
        }
        window.requestAnimationFrame(inertiaMove);
      };
      inertiaMove();
    },
  },
};
</script>

<style lang="scss" scoped>
.picker-row {
  position: relative;
  width: 375px;
  height: 216px; // 90 * 2 + 36
  overflow: hidden;
  margin: auto;
  background: #eeeeee;
}

.picker-col {
  float: left;
  width: 25%;
  height: 100%;
  position: relative;
  z-index: 10;
  background: #ffffff;
}

.picker-item {
  height: 36px;
  line-height: 36px;
  left: 0;
  color: #000;
  width: 100%;
  text-align: center;
  z-index: 1;
  user-select: none;
}

.picker-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  z-index: 10;
  background: -webkit-linear-gradient(top, #fff, hsla(0, 0%, 100%, .7));
  border-bottom: 1px solid #ddd;
  pointer-events: none;
}

.picker-line-bottom {
  top: auto;
  bottom: 0;
  border-top: 1px solid #ddd;
  border-bottom: none;
  background: -webkit-linear-gradient(bottom, #fff, hsla(0, 0%, 100%, .7));
}
</style>
