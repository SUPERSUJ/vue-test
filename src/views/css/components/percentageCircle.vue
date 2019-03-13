percentageCircle
<template>
  <div style="font-size: 16px;">
    <div class="container">
      <span>{{n}}%</span>
      <div class="slice">
        <div class="bar" :style="{
          transform: 'rotate(' + barDeg + 'deg)',
        }"></div>
        <div class="fill" :style="{
          transform: 'rotate(' + fillDeg + 'deg)',
          'border-color': fillBorderColor,
        }"></div>
      </div>
    </div>
    <button @click="addN">n++</button>
    <button @click="descN">n--</button>
  </div>
</template>

<script>
export default {
  name: 'percentageCircle',
  data() {
    return {
      n: 0,
    };
  },
  computed: {
    barDeg() {
      if (this.n < 50) {
        return this.n * 3.6;
      }
      return 180;
    },
    fillDeg() {
      if (this.n <= 50) {
        return 0;
      }
      return (this.n - 50) * 3.6 + 180;
    },
    fillBorderColor() {
      return this.n > 50 ? '#307bbb' : '#cccccc';
    },
  },
  methods: {
    addN() {
      if (this.n < 100) {
        this.n++;
      }
    },
    descN() {
      if (this.n > 0) {
        this.n--;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  font-size: 120px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background: #ccc;
  &:after {
    position: absolute;
    top: 0.08em;
    left: 0.08em;
    display: block;
    content: ' ';
    border-radius: 50%;
    background-color: whitesmoke;
    width: 0.84em;
    height: 0.84em;
  }
  span {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 5em;
    line-height: 5em;
    font-size: .2em;
    color: #ccc;
    display: block;
    text-align: center;
    white-space: nowrap;
  }
  .slice {
    position: absolute;
    width: 1em;
    height: 1em;
    .bar,
    .fill {
      position: absolute;
      border: 0.08em solid #307bbb;
      width: 120px;
      height: 120px;
      clip: rect(0, 60px, 120px, 0);
      // 上右下左 相对top和left的距离
      border-radius: 50%;
      transform: rotate(180deg);
    }
  }
}
</style>
