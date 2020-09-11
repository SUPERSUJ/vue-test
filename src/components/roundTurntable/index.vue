<template>
  <div ref="turntable" class="turntable">
    <div
      class="myTurntable"
      :style="{
        transform: rotateTransform,
        transition: rotateTransition,
      }"
      @transitionend="transitionend"
    >
      <canvas ref="canvas" id="canvas"></canvas>
      <div class="prize-container">
        <div
          v-for="(item, index) in prizeData"
          :key="index"
          class="prize-item"
          :style="getRotateAngle(index)"
        >
          <slot name="item" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { randomInt } from '@js/util';

export default {
  name: 'roundTurntable',
  props: {
    prizeData: {
      type: Array,
      required: true,
    },
    turntableStyleOptions: {
      type: Object,
      default: () => {
        return {
          prizeBgColors: ['#AE3EFF', '#4D3FFF', '#FC262C', '#3A8BFF', '#EE7602', '#FE339F'],
          borderColor: '#199301',
        };
      },
    },
    duringTime: {
      type: Number,
      default: 4.5,
    },
  },
  data() {
    this.prevRotateAngle = 0;
    return {
      rotateTransform: 0,
      rotateTransition: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 各种数据
      const data = this.turntableStyleOptions;
      const prizeNum = this.prizeData.length;
      const { prizeBgColors, borderColor } = data;
      // 开始绘画
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const canvasW = this.$refs.canvas.width = this.$refs.turntable.clientWidth; // 画板的高度
      const canvasH = this.$refs.canvas.height = this.$refs.turntable.clientHeight; // 画板的宽度
      console.log('canvasW: ', canvasW);
      console.log('canvasH: ', canvasH);
      // translate方法重新映射画布上的 (0,0) 位置
      ctx.translate(0, canvasH);
      // rotate方法旋转当前的绘图，因为文字适合当前扇形中心线垂直的！
      ctx.rotate(-90 * Math.PI / 180);
      // 圆环的外圆的半径
      const outRadius = canvasW / 2;
      // 圆环的内圆的半径
      const innerRadius = 0;
      const baseAngle = Math.PI * 2 / prizeNum; // 计算每个奖项所占角度数
      ctx.clearRect(0, 0, canvasW, canvasH); // 去掉背景默认的黑色
      ctx.strokeStyle = borderColor; // 设置画图线的颜色
      for (let index = 0; index < prizeNum; index++) {
        const angle = index * baseAngle;
        ctx.fillStyle = prizeBgColors[index]; // 设置每个扇形区域的颜色
        ctx.beginPath(); // 开始绘制
        // 标准圆弧：arc(x,y,radius,startAngle,endAngle,anticlockwise)
        ctx.arc(canvasW * 0.5, canvasH * 0.5, outRadius, angle, angle + baseAngle, false);
        ctx.arc(canvasW * 0.5, canvasH * 0.5, innerRadius, angle + baseAngle, angle, true);
        ctx.stroke();// 开始链线
        ctx.fill(); // 填充颜色
        ctx.save(); // 保存当前环境的状态
      }
    },
    getRotateAngle(index) {
      return {
        transform: `rotate(${(index + 0.5) * 360 / this.prizeData.length}deg)`,
      };
    },
    rotate(index) {
      const num = randomInt(8, 15);
      this.prevRotateAngle = this.prevRotateAngle - this.prevRotateAngle % 360 + num * 360 + 360 - 360 / this.prizeData.length * (index + 0.5);

      console.log('rotate index: ', index);
      console.log('rotate this.prevRotateAngle: ', this.prevRotateAngle);

      this.rotateTransform = `rotate(${this.prevRotateAngle}deg)`;
      this.rotateTransition = `transform ${this.duringTime}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`;
    },
    transitionend(e) {
      this.$emit('endRotate', e);
    },
  },
};
</script>

<style scoped lang="scss">
.turntable {
  /*background-color: red;*/
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  transform: translateZ(0);
  .myTurntable {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .prize-container {
    position: absolute;
    left: 25%;
    top: 0;
    width: 50%;
    height: 50%;
    .prize-item {
      /*background: pink;*/
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transform-origin: center bottom;
    }
  }
}
</style>
