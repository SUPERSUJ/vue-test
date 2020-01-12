<template>
  <div class="img-list">
    <ul :style="ulStyle" class="img-list-main">
      <li v-for="(item, index) in imgs" :key="item.src" :class="{
        'viewer-loading': item.loading,
        'viewer-active': index === imgIndex,
      }" @click="selected(index)">
        <img :src="item.src" @load="imgLoad" @error="imgError" :data-index="index" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'thumbnail',
  props: {
    imgList: {
      type: Array,
      default() {
        return [];
      },
    },
    imgIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      imgs: [],
    };
  },
  watch: {
    imgList: {
      handler(val) {
        this.imgs = val.map((item) => {
          return {
            src: item.src,
            loading: true,
          };
        });
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ulStyle() {
      return {
        width: `${this.imgs.length * 30}px`,
        'margin-left': `-${this.imgIndex * 30 + 15}px`,
      };
    },
  },
  methods: {
    imgLoad(e) {
      console.log('img loading success in thumbnail');
      let index = e.path[0].dataset.index;
      this.imgs[index].loading = false;
      // this.$set(this.imgs, index, {
      //   src: this.imgs[index].src,
      //   loading: false,
      // });
    },
    imgError() {
      // let index = e.path[0].dataset.index;
      console.log('img loading error in thumbnail');
    },
    selected(index) {
      this.$emit('update:imgIndex', index);
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  display: inline-block;
  width: 30px;
  height: 50px;
  overflow: hidden;
  transition: opacity .15s;
  opacity: .5;
  cursor: pointer;
}
.viewer-active {
  opacity: 1;
}
img {
  height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  background-color: rgba(0, 0, 0, 0.5);
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
