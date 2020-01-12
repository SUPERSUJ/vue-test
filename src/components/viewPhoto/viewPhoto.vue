<template>
  <div class="view-photo" :class="{'bg-show': open, 'bg-hidden': !open}" v-if="first" v-show="open">
    <div class="view-photo-main">
      <img
        class="show-img"
        @mousedown.passive="startMove"
        @touchstart="startMove"
        :src="currentImg.src"
        :alt="currentImg.text"
        :style="{
          'margin-left': left + 'px',
          'margin-top': top + 'px',
          'opacity': opacity,
        }"
        ref="showImg">
      <img v-show="showImgLoading" :src="imgLoading" class="img-loading">
      <div class="view-close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <span class="img-size" :class="{'show-size': showSize}">{{(this.size * 100).toFixed(0) + '%'}}</span>
      <span class="operate-tip" :class="{'show-operate-tip': showMsg}">{{ message }}</span>
      <div class="view-control">
        <div class="img-name">{{ currentImg.text }}</div>
        <div class="control-btns">
          <i class="el-icon-arrow-left" @click="pre"></i>
          <i class="el-icon-arrow-right" @click="next"></i>
          <i class="el-icon-zoom-in" @click="changeSize($event, 'zoom-in')"></i>
          <i class="el-icon-zoom-out" @click="changeSize($event, 'zoom-out')"></i>
          <i class="el-icon-refresh-left rotate-btn" @click="rotate($event, -90)"></i>
          <i class="el-icon-refresh-right rotate-btn" @click="rotate($event, +90)"></i>
          <i class="el-icon-sort" @click="flipUp"></i>
          <i class="el-icon-download" @click="download"></i>
        </div>
        <thumbnail :imgList="imgList" :imgIndex.sync="imgIndex"></thumbnail>
      </div>
    </div>
  </div>
</template>

<script>
// import { donwloadImage } from '@js/util';
import thumbnail from './thumbnail';

const BOTTOM_HEIGHT = 140; // 底部高度
const GAP = 100; // 图片上下左右最小空隙
const IMG_STYLE_TRANSITION = 'transform 0.3s ease-in-out'; // showImg 动画
const START_IMG_TIP = '已经是第一张图片'; // 第一张图片提示
const END_IMG_TIP = '已经是最后一张图片'; // 最后一张图片提示

export default {
  name: 'viewPhoto',
  data() {
    this.x = 0;
    this.y = 0;
    this.transform = '';
    this.reallyWidth = 0;
    this.reallyHeight = 0;
    this.msgTimer = null;
    this.sizeTimer = null;
    this.imgLoading = require('../../assets/svg/imgLoading.svg');
    return {
      showImgLoading: true,
      currentImg: {
        src: '',
        text: '',
      },
      imgIndex: 0,
      imgList: [],
      opacity: 0,
      left: 0,
      top: 0,
      open: false,
      first: false,
      size: 1,
      showSize: false,
      message: '',
      showMsg: '',
      rotateNum: 0,
    };
  },
  watch: {
    open() {
      if (this.open) {
        window.addEventListener('mousewheel', this.changeSize, { passive: false });
        document.body.style.overflow = 'hidden';
      } else {
        window.removeEventListener('mousewheel', this.changeSize);
        setTimeout(() => {
          this.currentImg.src = '';
          document.body.style.overflow = 'auto';
        }, 600);
      }
    },
    imgIndex() {
      let elem = this.$refs.showImg;
      this.showImgLoading = true;
      if (elem) {
        elem.style.transition = '';
        elem.offsetTop; // eslint-disable-line
      }
      this.opacity = 0;
      this.$nextTick(() => {
        this.rotateNum = 0;
        this.currentImg.src = this.imgList[this.imgIndex].src;
        this.currentImg.text = this.imgList[this.imgIndex].text;
        this.setRotate(this.$refs.showImg, 0, true);
        this.$nextTick(() => {
          this.opacity = 1;
          // this.$refs.showImg.style.transition = IMG_STYLE_TRANSITION;
          console.log('enter imgIndex');
        });
      });
    },
    showSize() {
      if (this.showSize) {
        clearInterval(this.sizeTimer);
        this.sizeTimer = setTimeout(() => {
          this.showSize = false;
        }, 1500);
      }
    },
    showMsg() {
      if (this.showMsg) {
        clearInterval(this.msgTimer);
        this.msgTimer = setTimeout(() => {
          this.showMsg = false;
          this.message = '';
        }, 1500);
      }
    },
  },
  methods: {
    // 退出
    close() {
      let elem = this.$refs.showImg;
      this.open = false;
      this.rotateNum = 0;
      this.transform = '';
      this.setTransform(elem, '');
      this.imgList = [];
      this.setRotate(elem);
    },
    // 图片布局
    showImg() {
      let screenH = document.documentElement.clientHeight - BOTTOM_HEIGHT;
      let screenW = document.documentElement.clientWidth;
      let imgMaxHeight = screenH - GAP;
      let imgMaxWidth = screenW - GAP;
      let img = this.$refs.showImg;
      img.style.height = 'auto';
      img.style.width = 'auto';
      let imgComputedStyle = window.getComputedStyle(img);
      this.reallyHeight = imgComputedStyle.height.replace('px', '');
      this.reallyWidth = imgComputedStyle.width.replace('px', '');
      let imgWidth;
      let imgHeight;
      // 如果超出安全范围
      if (this.reallyWidth > imgMaxWidth || this.reallyHeight > imgMaxHeight) {
        let isByWidth = this.reallyWidth / imgMaxWidth > this.reallyHeight / imgMaxHeight;
        let aspectRatio = this.reallyWidth / this.reallyHeight; // 宽高比例

        if (isByWidth) {
          this.size = imgMaxWidth / this.reallyWidth;
          this.size = parseFloat(this.size.toFixed(2));
          imgWidth = imgMaxWidth;
          imgHeight = imgMaxWidth / aspectRatio;
          img.style.width = `${imgMaxWidth}px`;
        } else {
          this.size = imgMaxHeight / this.reallyHeight;
          this.size = parseFloat(this.size.toFixed(2));
          imgWidth = imgMaxHeight * aspectRatio;
          imgHeight = imgMaxHeight;
          img.style.height = `${imgMaxHeight}px`;
        }
      } else {
        this.size = 1;
        imgWidth = this.reallyWidth;
        imgHeight = this.reallyHeight;
      }
      this.$nextTick(() => {
        this.opacity = 1;
        this.top = (screenH - imgHeight) / 2;
        this.left = (screenW - imgWidth) / 2;
      });
    },
    // 图片拖动
    startMove(event) {
      window.addEventListener('mousemove', this.move);
      window.addEventListener('touchmove', this.move);
      window.addEventListener('mouseup', this.leave);
      window.addEventListener('touchend', this.leave);
      this.x = event.clientX;
      this.y = event.clientY;
    },
    // 移动函数
    move(event) {
      event.preventDefault();
      let clientX = event.clientX;
      let clientY = event.clientY;
      this.left += clientX - this.x;
      this.top += clientY - this.y;
      this.x = clientX;
      this.y = clientY;
    },
    leave() {
      window.removeEventListener('mousemove', this.move);
      window.removeEventListener('touchmove', this.move);
      window.removeEventListener('mouseup', this.leave);
      window.removeEventListener('touchend', this.leave);
    },
    changeSize(event, zoomDir) {
      let target = event.target;
      if (zoomDir) {
        let elem = this.$refs.showImg;
        event = {};
        event.pageX = this.left + elem.width / 2;
        event.pageY = this.top + elem.height / 2;
        event.deltaY = zoomDir === 'zoom-in' ? -1 : 1;
        console.log('zoomDir event: ', event);
      } else if (target.tagName.toLowerCase() !== 'img') {
        return;
      }
      let pointer = {
        pageX: event.pageX,
        pageY: event.pageY,
      };
      this.showSize = true;
      let change = event.deltaY;
      let diffWidth;
      let diffHeight;
      if (change < 0) {
        if (this.size > 0.9 && this.size < 1) {
          let num = 1 - this.size;
          diffWidth = this.reallyWidth * num;
          diffHeight = this.reallyHeight * num;
          this.top -= diffHeight * ((pointer.pageY - this.top) / (this.reallyHeight * this.size));
          this.left -= diffWidth * ((pointer.pageX - this.left) / (this.reallyWidth * this.size));
          this.size = 1;
        } else {
          diffWidth = this.reallyWidth * 0.06;
          diffHeight = this.reallyHeight * 0.06;
          this.top -= diffHeight * ((pointer.pageY - this.top) / (this.reallyHeight * this.size));
          this.left -= diffWidth * ((pointer.pageX - this.left) / (this.reallyWidth * this.size));
          this.size += 0.06;
        }
      } else {
        if (this.size > 0.12) {
          diffWidth = this.reallyWidth * -0.06;
          diffHeight = this.reallyHeight * -0.06;
          this.top -= diffHeight * ((pointer.pageY - this.top) / (this.reallyHeight * this.size));
          this.left -= diffWidth * ((pointer.pageX - this.left) / (this.reallyWidth * this.size));
          this.size -= 0.06;
        }
      }
      this.$nextTick(() => {
        this.$refs.showImg.style.width = `${this.reallyWidth * this.size}px`;
        this.$refs.showImg.style.height = `${this.reallyHeight * this.size}px`;
      });
      if (!zoomDir) {
        event.preventDefault();
      }
    },
    // 下一张
    next() {
      if (this.imgIndex < this.imgList.length - 1) {
        this.imgIndex += 1;
      } else {
        this.end();
      }
    },
    pre() {
      if (this.imgIndex > 0) {
        this.imgIndex -= 1;
      } else {
        this.showMsg = true;
        this.message = START_IMG_TIP;
      }
    },
    end() {
      this.showMsg = true;
      this.message = END_IMG_TIP;
    },
    openView(e) {
      console.log('enter openView e: ', e);
      let parentElem = e.currentTarget;
      let target = e.target;
      if (target.nodeName.toLowerCase() === 'img') {
        if (!this.first) {
          this.first = true;
          this.$nextTick(() => {
            console.log('enter img nextTick');
            let elem = this.$refs.showImg;
            let imgIndex = this.imgIndex;
            elem.onload = () => {
              this.showImgLoading = false;
              // 图片加载成功后布局
              this.showImg();
              elem.style.transition = IMG_STYLE_TRANSITION;
              console.log('elem onload callback');
            };
            elem.onerror = () => {
              this.showImgLoading = false;
              let defaultImg = require('../../assets/svg/imgLoadFail.svg');
              let imgListItem = this.imgList[imgIndex];
              console.log('this.imgList[imgIndex]: ', imgListItem);
              if (imgListItem) {
                this.imgList[imgIndex].src = defaultImg;
              }
              if (this.imgIndex === imgIndex) {
                this.currentImg.src = defaultImg;
              }
            };
          });
        }
        this.open = true;
        this.currentImg.src = target.src;
        this.currentImg.text = target.alt || '图片';
        this.opacity = 0;
        let imgList = Array.from(parentElem.querySelectorAll('img'));
        this.imgList = imgList.map((item, index) => {
          if (this.currentImg.src === item.src) {
            this.imgIndex = index;
          }
          return {
            src: item.getAttribute('data-src'), // data-src 存放原图路径
            text: item.alt || '图片',
          };
        });
      }
    },
    rotate(e, rotateNum) {
      let self = e.target;
      this.rotateNum += rotateNum;
      this.emitRotateBtnAnimation(self, rotateNum > 0);
      this.setRotate(this.$refs.showImg);
    },
    emitRotateBtnAnimation(elem, isRight) {
      let animationName = isRight ? 'rotate-btn-rotate-right' : 'rotate-btn-rotate-left';
      elem.style.animationName = '';
      elem.style.webkitAnimationName = '';
      elem.offsetTop; // eslint-disable-line
      elem.style.animationName = animationName;
      elem.style.webkitAnimationName = animationName;
    },
    setRotate(elem, rotateNum = this.rotateNum, isReset) { // isReset 上一张图片和下一站图片要重置 rotate(0)deg
      if (this.transform === 'none' || isReset) {
        this.transform = '';
      }
      let reg = /rotate\(([\d|\-]+)deg\)/;
      let hasSetRotate = !!(reg.exec(this.transform));
      if (this.transform && hasSetRotate) {
        this.transform = this.transform.replace(reg, () => {
          return `rotate(${rotateNum}deg)`;
        });
      } else if (this.transform && !hasSetRotate) {
        this.transform += ` rotate(${rotateNum}deg)`;
      } else {
        this.transform = `rotate(${rotateNum}deg)`;
      }
      this.transform = this.transform.trim();
      console.log('rotate: ', this.transform);
      this.setTransform(elem, this.transform);
    },
    flipUp() { // 上下翻转
      if (this.transform === 'none') {
        this.transform = '';
      }
      let elem = this.$refs.showImg;
      let reg = /scaleY\([\d|\-]+\)/;
      let defaultValue = 'scaleY(-1)';
      let hasFilpUp = !!(reg.exec(this.transform));
      if (hasFilpUp && this.transform === defaultValue) {
        this.transform = 'none';
      } else if (hasFilpUp && this.transform && this.transform !== defaultValue) {
        this.transform = this.transform.replace(reg, () => {
          return '';
        });
      } else {
        this.transform += ' scaleY(-1)';
      }
      this.transform = this.transform.trim();
      console.log('flipUp: ', this.transform);
      this.setTransform(elem, this.transform);
    },
    download() {
      // donwloadImage(this.currentImg.src, this.currentImg.text);
    },
    setTransform(elem, transform) {
      elem.style.webkitTransform = transform;
      elem.style.MozTransform = transform;
      elem.style.msTransform = transform;
      elem.style.OTransform = transform;
      elem.style.transform = transform;
    },
  },
  components: {
    thumbnail,
  },
};
</script>

<style lang="scss" scoped>
  .view-photo {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10000;
    background-color: rgba(0, 0, 0, .5);
    overflow: hidden;

    .view-photo-main {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;

      .img-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: -70px;
      }

      .show-img {
        position: absolute;
        cursor: -webkit-grab;
        user-select: none;
        visibility: visible;
        animation: inherit;
      }

      .view-close {
        position: absolute;
        top: -40px;
        right: -40px;
        width: 80px;
        height: 80px;
        cursor: pointer;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .5);
        i {
          position: relative;
          top: 40px;
          right: -8px;
          font-size: 30px;
          color: #ffffff;
        }
      }

      .img-name {
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
      }

      .view-control {
        position: absolute;
        width: 100%;
        // height: 60px;
        bottom: 0;
        text-align: center;
        user-select: none;

        .control-btns {
          display: inline-block;
          font-size: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }

        i {
          display: inline-block;
          line-height: 50px;
          font-size: 26px;
          color: #ffffff;
          cursor: pointer;
          padding: 0 6px 0 6px;
        }

        i:active {
          opacity: .5;
        }

        .rotate-btn {
          animation-duration: .5s;
          animation-timing-function: ease-in-out;
        }
      }

      .img-size {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0 12px 0 12px;
        font-size: 14px;
        line-height: 35px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(0, 0, 0, 0.3);
        text-align: center;
        border-radius: 20px;
        color: white;
        visibility: hidden;
        opacity: 0;
        margin-top: -70px;
      }

      .show-size {
        opacity: 1;
        visibility: visible;
      }

      .operate-tip {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        line-height: 35px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(0, 0, 0,  0.3);
        text-align: center;
        border-radius: 20px;
        padding: 0 15px;
        color: white;
        visibility: hidden;
        opacity: 0;
        z-index: 10;
        margin-top: -70px;
      }

      .show-operate-tip {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .model-open {
    zoom: 1;
    position: fixed;
    width: 100%;
    top: 0;
  }

  .bg-show {
    animation: vfadeIn 0.3s ease-out 1;

    .show-img {
      visibility: hidden;
      animation: vscaleIn 0.3s ease-out 1;
      animation-fill-mode: forwards;
    }
  }

  .bg-hidden {
    animation: vfadeOut 0.3s ease-out 0.3s 1;
    animation-fill-mode: forwards;

    .show-img {
      animation: vscaleOut 0.3s ease-out 1;
      animation-fill-mode: forwards;
    }
  }

  @keyframes vfadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes vfadeOut {
    0% {
      opacity: 1;
    }

    100% {
      visibility: hidden;
      opacity: 0;
    }
  }

  @keyframes vscaleIn {
    0% {
      visibility: visible;
      transform: scale3d(0, 0, 0);
    }

    100% {
      visibility: visible;
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes vscaleOut {
    0% {
      transform: scale3d(1, 1, 1);
    }

    100% {
      visibility: hidden;
      transform: scale3d(0, 0, 0);
    }
  }
</style>

<style>
@keyframes rotate-btn-rotate-right {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes rotate-btn-rotate-left {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
