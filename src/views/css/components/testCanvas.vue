<template>
  <div class="testCanvas">
    <canvas ref="canvas" id="canvas" width="400" height="400"></canvas>
  </div>
</template>

<script>
export default {
  name: 'testCanvas',
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext('2d');

      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(50, 50, 20, 0, Math.PI / 2, false);
      ctx.arc(50, 50, 50, Math.PI / 2, 0, true);
      ctx.stroke();
      ctx.fill();
      ctx.save();
    },
  },
};
</script>

<style lang="scss" scoped>
.testCanvas {
  width: 600px;
  height: 600px;
  border: 1px solid black;
}
</style>
