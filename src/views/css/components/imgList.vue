<template>
  <ul>
    <li v-for="(item, index) in data" :key="item.src" :class="{
      'viewer-loading': item.loading,
    }">
      <img :src="item.src" alt="" @load="imgLoad" :data-index="index">
    </li>
  </ul>
</template>

<script>
export default {
  name: 'imgList',
  data() {
    return {
      data: [{
        src: 'https://images.pexels.com/photos/3036355/pexels-photo-3036355.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        loading: true,
      }, {
        src: 'https://images.pexels.com/photos/2568091/pexels-photo-2568091.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        loading: true,
      }, {
        src: 'https://images.pexels.com/photos/2819549/pexels-photo-2819549.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        loading: true,
      }, {
        src: 'https://images.pexels.com/photos/3039185/pexels-photo-3039185.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        loading: true,
      }, {
        src: 'https://images.pexels.com/photos/3032049/pexels-photo-3032049.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        loading: true,
      }, {
        src: 'https://images.pexels.com/photos/2652991/pexels-photo-2652991.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        loading: true,
      }, {
        src: 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        loading: true,
      }, {
        src: 'https://images.pexels.com/photos/1211839/pexels-photo-1211839.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        loading: true,
      }],
    };
  },
  methods: {
    imgLoad(e) {
      let index = e.path[0].dataset.index;
      this.data[index].loading = false;
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
</style>
