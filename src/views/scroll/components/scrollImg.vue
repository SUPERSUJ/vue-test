<template>
  <div>
    <div class="scroll-img">
      <div class="arrow" style="left: 0;">
        <i class="arrow-left" @click="prev"></i>
      </div>
      <div class="container">
        <div class="container-scroll" @click="selectImg" :style="{ left: left + 'px' }">
          <img v-for="i in n" :key="i" :src="src + i" :data-index="i" :class="{ selected: i === index }">
        </div>
      </div>
      <div class="arrow" style="right: 0;">
        <i class="arrow-right" @click="next"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scrollImg',
  data() {
    return {
      src: 'https://placeimg.com/300/300/animals?i=',
      n: 10,
      index: 1,
      left: 0,
    };
  },
  methods: {
    prev() {
      if (this.index > 1) {
        this.index--;
        this.setLeft();
      }
    },
    next() {
      if (this.index < this.n) {
        this.index++;
        this.setLeft();
      }
    },
    setLeft() {
      if (this.index >= 4 && this.index < this.n) {
        this.left = -(this.index - 3) * 76;
      } else if (this.index === this.n) {
        this.left = -(this.n - 4) * 76;
      } else {
        this.left = 0;
      }
    },
    selectImg(e) {
      let target = e.target;
      let index = target.dataset.index;
      if (index) {
        this.index = parseInt(index, 0);
        this.setLeft();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-img {
  width: 350px;
  height: 70px;
  margin-top: 10px;
  left: 25px;
  border: 1px solid goldenrod;
  position: relative;

  .arrow {
    width: 12px;
    height: 100%;
    position: absolute;
    top: 0;
    line-height: 70px;
    .arrow-left,
    .arrow-right {
      border: solid black;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 5px;
      cursor: pointer;
      &:hover {
        border-color: #999;
      }
    }
    .arrow-left {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    }
    .arrow-right {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }

  .container {
    width: 310px;
    height: 70px;
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    .container-scroll {
      // width: 800%;
      position: absolute;
      white-space: nowrap;
      display: block;
      left: 0;
      transition: all .5s;
      img {
        box-sizing: border-box;
        width: 70px;
        height: 70px;
        margin-right: 6px;
        cursor: pointer;
        // float: left;
        transition: all .3s;
        &.selected {
          border: 1px solid yellowgreen;
          padding: 2px;
        }
      }
    }
  }
}
</style>
