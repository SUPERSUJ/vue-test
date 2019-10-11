<template>
  <div>
    <div class="viewer-list" :class="{
      'viewer-loading': isShowLoading,
    }"></div>
    <button @click="change">change</button>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data() {
    return {
      isShowLoading: false,
    };
  },
  methods: {
    change() {
      this.isShowLoading = !this.isShowLoading;
    },
  },
};
</script>

<style lang="scss" scoped>
.viewer-list {
  display: inline-block;
  color: transparent;
  cursor: pointer;
  font-size: 0;
  height: 50px;
  line-height: 0;
  opacity: 0.5;
  overflow: hidden;
  -webkit-transition: opacity 0.15s;
  transition: opacity 0.15s;
  width: 30px;
  background: red;
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
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-left-color: rgba(255, 255, 255, 0.5);
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
