<template>
  <div class="view-photo" :class="{'bg-show': open, 'bg-hidden': !open}" v-if="first" v-show="open">
    <div class="x-show">
      <img
        class="show-img"
        @mousedown="startMove"
        @touchstart="startMove"
        :src="now.url"
        :alt="now.text"
        :style="{
          'margin-left': left + 'px',
          'margin-top': top + 'px',
          'opacity': opacity
        }"
         ref="showImg">
       <div class="view-close" @click="close">
         <img src="../../assets/imgs/imgClose.svg" alt="关闭" width="50" height="50">
       </div>
      <span class="size" :class="{'show-size': showSize}">{{(this.size * 100).toFixed(0) + '%'}}</span>
      <span class="msg" :class="{'show-msg': showMsg}">{{ message }}</span>
      <div class="view-control">
        <div class="show-control">
          <span class="v-pre" @click="pre">
            <img src="../../assets/imgs/prevImg.svg" alt="上一张" width="50" height="50">
          </span>
          <span>
            <img
              src="../../assets/imgs/imgRotate.svg"
              alt="旋转"
              width="50"
              height="50"
              @click="rotate"
              class="rotate-btn">
          </span>
          <span class="v-next" @click="next">
            <img src="../../assets/imgs/nextImg.svg" alt="下一张" width="50" height="50">
          </span>
        </div>
        <div class="img-list">
        <ul :style="ulStyle" class="img-list-main">
          <li v-for="(item, index) in imgLists" :key="item.url" class="img-list-item" :class="{
            'viewer-loading': item.loading,
            'viewer-active': index === img_index,
          }" @click="selected(index)">
            <img :src="item.src" alt="" @load="imgLoad" @error="imgError" :data-index="index">
          </li>
        </ul>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.x = 0;
    this.y = 0;
    return {
      now: {
        url: '',
        text: '',
      },
      img_index: 0,
      imgLists: [],
      opacity: 0,
      left: 0,
      top: 0,
      open: false,
      first: false,
      reallyWidth: 0,
      reallyHeight: 0,
      size: 1,
      showSize: false,
      setSize: '',
      message: '',
      showMsg: '',
      setMsg: '',
      rotateNum: 0,
    };
  },
  computed: {
    ulStyle() {
      return {
        width: `${this.imgLists.length * 30}px`,
        'margin-left': `-${this.img_index * 30 + 15}px`,
      };
    },
  },
  watch: {
    open() {
      if (this.open) {
        window.addEventListener('mousewheel', this.changeSize);
        document.body.style.overflow = 'hidden';
        console.log('this.imgLists: ', this.imgLists);
      } else {
        window.removeEventListener('mousewheel', this.changeSize);
        setTimeout(() => {
          this.now.url = '';
          document.body.style.overflow = 'auto';
        }, 600);
      }
    },
    img_index(val) {
      this.now.url = this.imgLists[val].url;
      this.now.text = this.imgLists[val].text;
    },
    showSize() {
      if (this.showSize) {
        clearInterval(this.setSize);
        this.setSize = setTimeout(() => {
          this.showSize = false;
        }, 1500);
      }
    },
    showMsg() {
      if (this.showMsg) {
        clearInterval(this.setMsg);
        this.setmsg = setTimeout(() => {
          this.showMsg = false;
          this.message = '';
        }, 1500);
      }
    },
  },
  methods: {
    imgLoad(e) {
      console.log('imgLoad e: ', e);
      let index = e.path[0].dataset.index;
      this.imgLists[index].loading = false;
    },
    imgError(e) {
      console.log('imgError e: ', e);
    },
    selected(index) {
      this.img_index = index;
    },
    // 退出
    close() {
      let hasClass = (ele, cls) => ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
      if (hasClass(this.$refs.showImg, 'rotate')) {
        window.setTimeout(() => {
          this.$refs.showImg.className.replace(new RegExp('(?:^|\\s)' + 'rotate' + '(?:\\s|$)'), ' ');
          this.setRotate(this.$refs.showImg);
        }, 500);
      }
      this.rotateNum = 0;
      this.open = false;
    },
    // 图片布局
    showImg() {
      let screenH = document.documentElement.clientHeight - 60;
      let screenW = document.documentElement.clientWidth;
      let img = this.$refs.showImg;
      img.style.height = 'auto';
      img.style.width = 'auto';
      this.reallyHeight = window.getComputedStyle(img).height.replace('px', '');
      this.reallyWidth = window.getComputedStyle(img).width.replace('px', '');
      if ((screenH - 100) < img.height) {
        this.size = (screenH - 100) / img.height;
        this.size = parseFloat(this.size.toFixed(2));
        img.style.height = `${screenH - 100}px`;
      } else {
        this.size = 1;
      }
      this.$nextTick(() => {
        this.opacity = 1;
        this.top = (screenH - this.reallyHeight * this.size) / 2;
        this.left = (screenW - this.reallyWidth * this.size) / 2;
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
    changeSize(event) {
      let target = event.target;
      if (target.tagName.toLowerCase() !== 'img') {
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
      event.preventDefault();
    },
    // 下一张
    next() {
      if (this.img_index < this.imgLists.length - 1) {
        this.img_index += 1;
      } else {
        this.end();
      }
    },
    pre() {
      if (this.img_index > 0) {
        this.img_index -= 1;
      } else {
        this.showMsg = true;
        this.message = '已经是第一张了, 向后点击看看!';
      }
    },
    end() {
      this.showMsg = true;
      this.message = '后面没有了哟!';
    },
    openView(e) {
      let parentElem = e.currentTarget;
      let target = e.target;
      if (target.nodeName.toLowerCase() === 'img') {
        if (!this.first) {
          this.first = true;
          this.$nextTick(() => {
            this.$refs.showImg.onload = () => {
              // 图片加载成功后布局
              this.showImg();
            };
          });
        }
        this.open = true;
        this.now.url = target.dataset.max || target.src;
        this.now.text = target.alt || '图片';
        this.opacity = 0;
        let imgLists = Array.from(parentElem.querySelectorAll('img'));
        if (imgLists.length !== this.imgLists.length) {
          this.setImglists(imgLists);
          console.log('111111111');
          console.log('this.imgLists: ', this.imgLists);
          console.log('更新图片集合');
        } else {
          for (let i = 0, len = imgLists.length; i < len; i++) {
            if (imgLists[i].src !== this.imgLists[i].src) {
              this.setImglists(imgLists);
              console.log('22222222');
              console.log('this.imgLists: ', this.imgLists);
              console.log('更新图片集合');
              return;
            }
          }
          this.img_index = this.imgLists.findIndex((item) => item.src === this.now.url);
        }
      }
    },
    setImglists(imgLists) {
      let srcs = imgLists.map((item) => item.src);
      this.imgLists = imgLists.map((item, index) => {
        console.log(this.now.url);
        console.log(item.src);
        if (this.now.url === item.src) {
          this.img_index = index;
        }
        return {
          src: '',
          url: item.dataset.max || item.src,
          text: item.alt || '图片',
          loading: true,
        };
      });
      this.$nextTick(() => {
        srcs.forEach((src, index) => {
          this.imgLists[index].src = src;
        });
        srcs = null;
      });
    },
    rotate(e) {
      let self = e.target;
      this.rotateNum += 90;
      this.emitRotateBtnAnimation(self);
      let hasClass = (ele, cls) => ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
      if (!hasClass(this.$refs.showImg, 'rotate')) {
        this.$refs.showImg.className += ' rotate';
      }
      if (hasClass(this.$refs.showImg, 'bg-show')) {
        this.$refs.showImg.className.replace(new RegExp('(?:^|\\s)bg-show(?:\\s|$)'), ' ');
      }
      this.setRotate(this.$refs.showImg);
    },
    emitRotateBtnAnimation(elem) {
      elem.style.animationName = '';
      elem.style.webkitAnimationName = '';
      elem.offsetTop;  // eslint-disable-line
      elem.style.animationName = 'rotate-btn-rotate';
      elem.style.webkitAnimationName = 'rotate-btn-rotate';
    },
    setRotate(elem, rotateNum = this.rotateNum) {
      elem.style.webkitTransform = `rotate(${rotateNum}deg)`;
      elem.style.MozTransform = `rotate(${rotateNum}deg)`;
      elem.style.msTransform = `rotate(${rotateNum}deg)`;
      elem.style.OTransform = `rotate(${rotateNum}deg)`;
      elem.style.transform = `rotate(${rotateNum}deg)`;
    },
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
  background-color: rgba(0,0,0,.5);
  overflow: hidden;

  .x-show {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;

    img.show-img {
      position: absolute;
      cursor: -webkit-grab;
      user-select: none;
      transition: transform 0.5s ease-in-out;
    }

    img.rotate {
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
      background: #ffffff;
        img {
          position: relative;
          top: 40px;
          right: 10px;
        }
    }

    .view-control {
      position: absolute;
      width: 100%;
      height: 110px;
      bottom: 0;
      background-color: rgba(0,0,0,.5);

      .rotate-btn {
        animation-duration: .5s;
        animation-timing-function: ease-in-out;
      }

      .show-control {
        width: 200px;
        margin: auto;
        display: flex;

        span {
          width: 100px;
          text-align: center;
          cursor: pointer;

          img {
            position: relative;
            top: 4px;
          }
        }
      }
    }

    .size {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -60px;
      margin-left: -17.5px;
      width: 80px;
      font-size: 14px;
      line-height: 35px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(0, 0, 0,  0.3);
      text-align: center;
      border-radius: 20px;
      color: white;
      visibility: hidden;
      opacity: 0;
    }

    .show-size {
      opacity: 1;
      visibility: visible;
    }

    .msg {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -60px;
      margin-left: -117.5px;
      width: 250px;
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
    }

    .show-msg {
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

  img.show-img {
    visibility: hidden;
    animation: vscaleIn 0.3s ease-out 1;
    animation-fill-mode: forwards;
  }
}

.bg-hidden {
  animation: vfadeOut 0.3s ease-out 0.3s 1;
  animation-fill-mode: forwards;

  img.show-img {
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
.img-list-item {
  display: inline-block;
  width: 30px;
  height: 50px;
  overflow: hidden;
  transition: opacity .15s;
  opacity: .5;
  cursor: pointer;
  img {
    height: 100%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.viewer-active {
  opacity: 1;
}

.viewer-loading {
  position: relative;
}

@-webkit-keyframes viewer-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes viewer-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.viewer-loading::after {
  animation: viewer-spinner 1s linear infinite;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  content: '';
  display: inline-block;
  left: 50%;
  position: absolute;
  top: 50%;
  z-index: 1;
  height: 20px;
  margin-left: -10px;
  margin-top: -10px;
  width: 20px;
  box-sizing: border-box;
}
.img-list {
  // background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.img-list-main {
  position: relative;
  left: 50%;
  box-sizing: content-box;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 0;
  padding: 0;
  transition: all 0.3s;
}
</style>

<style>
@keyframes rotate-btn-rotate {
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
</style>

