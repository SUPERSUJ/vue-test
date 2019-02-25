<template>
  <div id="zoomImg" :style="setWH">
    <div
      ref="small"
      class="small"
      :style="setWH"
      @mouseenter="enterImg"
      @mousemove="moveInImg"
      @mouseleave="leaveImg"
      >
      <div ref="mask" v-show="maskShow" class="mask" :style="[
        setHelfWH,
        {
          opacity: this.defaultConfig.opacity,
          background: this.defaultConfig.background,
        },
      ]"></div>
      <img
        :src="src"
        :style="setWH"/>
    </div>
    <div class="big" ref="big" v-show="bigShow" :style="setWH">
      <img class="big-img" ref="bigImg" :src="src" :style="set2WH">
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import { getOffset, getScrollTop, getScrollLeft } from '@js/util';

const defaultConfig = {
  width: 400,
  position: 'right', // 放大区域位于右边
  background: '#222',
  opacity: 0.7, // 放大镜透明度
  distance: 20, // 被放大区域距离原区域的距离
};

export default {
  name: 'zoomImg',
  props: {
    defaultConfig: {
      type: Object,
      default() {
        return defaultConfig;
      },
    },
  },
  data() {
    return {
      src: 'https://picsum.photos/1200/1200/?image=523',
      topDistance: 0,
      leftDistance: 0,
      bigShow: false,
      maskShow: false,
      self: this,
    };
  },
  computed: {
    setWH() {
      return {
        width: `${this.defaultConfig.width}px`,
        height: `${this.defaultConfig.width}px`,
      };
    },
    set2WH() {
      return {
        width: `${2 * this.defaultConfig.width}px`,
        height: `${2 * this.defaultConfig.width}px`,
      };
    },
    setHelfWH() {
      return {
        width: `${this.defaultConfig.width / 2}px`,
        height: `${this.defaultConfig.width / 2}px`,
      };
    },
  },
  mounted() {
    this.initZoomStyle();
  },
  methods: {
    initZoomStyle() {
      if (!this.defaultConfig.position) {
        return;
      }
      let positions = ['left', 'right', 'top', 'bottom'];
      let hasPosition = positions.indexOf(this.defaultConfig.position) !== -1;
      if (hasPosition) {
        this.$refs.big.style[this.defaultConfig.position] = `-${this.defaultConfig.width + this.defaultConfig.distance}px`;
      }
    },
    setDistence(e) {
      let offset = getOffset(e.currentTarget);
      let scrollTop = getScrollTop();
      let scrollLeft = getScrollLeft();

      this.topDistance = e.clientY - (offset.top - scrollTop);
      this.leftDistance = e.clientX - (offset.left - scrollLeft);
    },
    enterImg(e) {
      this.setDistence(e);
      if (
        this.topDistance <= this.defaultConfig.width / 4
        && this.leftDistance <= this.defaultConfig.width / 4
      ) {
        this.$refs.mask.style.top = 0;
        this.$refs.mask.style.left = 0;
        this.$refs.bigImg.style.top = 0;
        this.$refs.bigImg.style.left = 0;
      } else if (
        this.topDistance >= 3 * this.defaultConfig.width / 4
        && this.leftDistance <= this.defaultConfig.width / 4
      ) {
        this.$refs.mask.style.top = `${this.defaultConfig.width / 2}px`;
        this.$refs.mask.style.left = 0;
        this.$refs.bigImg.style.top = `-${this.defaultConfig.width}px`;
        this.$refs.bigImg.style.left = 0;
      } else if (
        this.topDistance <= this.defaultConfig.width / 4
        && this.leftDistance >= 3 * this.defaultConfig.width / 4
      ) {
        this.$refs.mask.style.top = 0;
        this.$refs.mask.style.left = `${this.defaultConfig.width / 2}px`;
        this.$refs.bigImg.style.top = 0;
        this.$refs.bigImg.style.left = `${-this.defaultConfig.width}px`;
      } else if (
        this.topDistance >= 3 * this.defaultConfig.width / 4
        && this.leftDistance >= 3 * this.defaultConfig.width / 4
      ) {
        this.$refs.mask.style.top = `${this.defaultConfig.width / 2}px`;
        this.$refs.mask.style.left = `${this.defaultConfig.width / 2}px`;
        this.$refs.bigImg.style.top = `-${this.defaultConfig.width}px`;
        this.$refs.bigImg.style.left = `-${this.defaultConfig.width}px`;
      }
      this.$nextTick(() => {
        this.maskShow = true;
        this.bigShow = true;
      });
    },
    notTouchBorder() {
      if (
        this.leftDistance > this.defaultConfig.width / 4
        && this.leftDistance < 3 * this.defaultConfig.width / 4
        && this.topDistance > this.defaultConfig.width / 4
        && this.topDistance < 3 * this.defaultConfig.width / 4
      ) {
        return true;
      }
      return false;
    },
    moveInImg(e) {
      this.setDistence(e);
      let mask = document.getElementsByClassName('mask')[0];
      let bigImg = document.getElementsByClassName('big-img')[0];
      if (this.notTouchBorder()) {
        mask.style.top = `${this.topDistance - this.defaultConfig.width / 4}px`;
        mask.style.left = `${this.leftDistance - this.defaultConfig.width / 4}px`;
        // 放大的图反方向移动,大图的移动是小图的两倍
        bigImg.style.top = `${-2 * (this.topDistance - this.defaultConfig.width / 4)}px`;
        bigImg.style.left = `${-2 * (this.leftDistance - this.defaultConfig.width / 4)}px`;
      } else {
        if (
          this.leftDistance - this.defaultConfig.width / 4 >= 0
          && this.leftDistance - 3 * this.defaultConfig.width / 4 <= 0) {
          mask.style.left = `${this.leftDistance - this.defaultConfig.width / 4}px`;
          bigImg.style.left = `${-2 * (this.leftDistance - this.defaultConfig.width / 4)}px`;
        } else if (this.leftDistance < this.defaultConfig.width / 4) {
          mask.style.left = '0px';
          bigImg.style.left = '0px';
        } else if (this.leftDistance > 3 * this.defaultConfig.width / 4) {
          mask.style.left = `${this.defaultConfig.width / 2}px`;
          bigImg.style.left = `${-this.defaultConfig.width}px`;
        }
        if (
          this.topDistance - this.defaultConfig.width / 4 >= 0
          && this.topDistance - 3 * this.defaultConfig.width / 4 <= 0) {
          mask.style.top = `${this.topDistance - this.defaultConfig.width / 4}px`;
          bigImg.style.top = `${-2 * (this.topDistance - this.defaultConfig.width / 4)}px`;
        } else if (this.topDistance < this.defaultConfig.width / 4) {
          mask.style.top = '0px';
          bigImg.style.top = '0px';
        } else if (this.topDistance > 3 * this.defaultConfig.width / 4) {
          mask.style.top = `${this.defaultConfig.width / 2}px`;
          bigImg.style.top = `${-this.defaultConfig.width}px`;
        }
      }
    },
    leaveImg() {
      this.maskShow = false;
      this.bigShow = false;
    },
  },
};
</script>

<style scoped>
#zoomImg {
  margin: 50px;
}

#zoomImg {
  position: relative;
}

#zoomImg .mask {
  box-sizing: border-box;
  border: 1px solid #999;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: move;
}

#zoomImg .small,
#zoomImg .big {
  position: absolute;
  border: 1px solid #aaa;
}

#zoomImg .small {
  top: 0;
  left: 0;
  cursor: move;
}

#zoomImg .big {
  overflow: hidden;
}

#zoomImg .small img,
#zoomImg .big img {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
