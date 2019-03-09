<template>
  <div>
    <div class="slideshow-container">
      <div class="mySlides fade" v-show="slideIndex === 1">
        <div class="numbertext">1 / 3</div>
        <img src="../../../assets/imgs/img_nature_wide.jpg" width="100%">
        <div class="text">Caption Text</div>
      </div>
      <div class="mySlides fade" v-show="slideIndex === 2">
        <div class="numbertext">2 / 3</div>
        <img src="../../../assets/imgs/img_snow_wide.jpg" width="100%">
        <div class="text">Caption Two</div>
      </div>
      <div class="mySlides fade" v-show="slideIndex === 3">
        <div class="numbertext">3 / 3</div>
        <img src="../../../assets/imgs/img_mountains_wide.jpg" width="100%">
        <div class="text">Caption Three</div>
      </div>
      <a href="javascript:;" class="prev" @click="perv">&#10094;</a>
      <a href="javascript:;" class="next" @click="next">&#10095;</a>
    </div>
    <div style="text-align: center; margin-top: 10px;">
      <span class="dot" :class="{ active: slideIndex === 1 }" @click="slideIndex = 1"></span>
      <span class="dot" :class="{ active: slideIndex === 2 }" @click="slideIndex = 2"></span>
      <span class="dot" :class="{ active: slideIndex === 3 }" @click="slideIndex = 3"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slideshow',
  data() {
    return {
      slideIndex: 1,
    };
  },
  methods: {
    perv() {
      this.slideIndex -= 1;
      if (this.slideIndex === 0) {
        this.slideIndex = 3;
      }
    },
    next() {
      this.slideIndex += 1;
      if (this.slideIndex === 4) {
        this.slideIndex = 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}
img {
  vertical-align: middle;
}
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color .6s ease;
}
.active,
.dot:hover {
  background-color: #717171;
}
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}
// display auto 到 none 触发
@keyframes fade {
  from {
    opacity: .4;
  }
  to {
    opacity: 1;
  }
}
</style>
