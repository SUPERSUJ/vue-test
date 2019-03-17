<template>
  <div
    class="wrap"
    ref="wrap"
    @mousemove="move"
    :style="wrapStyle">
    <div class="main">
      <div
        style="transform: translateZ(50px);">
        <img ref="img" src="../../../assets/imgs/parallax1.png">
      </div>
      <div
        style="transform: translateZ(100px);">
        <img src="../../../assets/imgs/parallax2.png">
      </div>
      <div
        style="transform: translateZ(150px);">
        <img src="../../../assets/imgs/parallax3.png">
      </div>
    </div>
  </div>
</template>

<script>
import { getOffset } from '@js/util';

export default {
  name: 'parallax',
  data() {
    return {
      centerPos: {
        x: 0,
        y: 0,
      },
      moveDistance: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    wrapStyle() {
      return {
        transform: `rotateX(${this.moveDistance.x}deg) rotateY(${this.moveDistance.y}deg)`,
      };
    },
  },
  methods: {
    move(e) {
      let offset = getOffset(this.$refs.wrap);
      let imgRect = this.$refs.img.getBoundingClientRect();
      this.centerPos.y = offset.top + (imgRect.bottom - imgRect.top) / 2;
      this.centerPos.x = offset.left + (imgRect.right - imgRect.left) / 2;
      this.moveDistance.x = -(this.centerPos.y - e.clientY) / 27;
      this.moveDistance.y = (this.centerPos.x - e.clientX) / 30;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  transform-style: preserve-3d;
}
.main div {
  position: absolute;
}
img {
  width: 800px;
}
</style>
