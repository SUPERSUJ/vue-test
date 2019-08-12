<template>
  <div>
    <transition name="slide-fade">
      <p :key="text">{{text}}</p>
    </transition>
    <button @click="changeText">button</button>
  </div>
</template>

<script>
export default {
  name: 'testKey',
  data() {
    return {
      text: 'hello',
    };
  },
  methods: {
    changeText() {
      // 修改key也是可以触发transition
      this.text += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
