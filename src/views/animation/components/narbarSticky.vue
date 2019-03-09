<template>
  <div>
    <!-- 注意：scroll 和 wheel的区别 -->
    <div @scroll="wheelHandler" class="scroll-container" ref="scroll">
      <h2>1</h2>
      <h2>1</h2>
      <h2>1</h2>
      <h2>1</h2>
      <div ref="navbar" class="navbar" :class="{ sticky: doSticky }">
        <a class="active" href="javascript:;">Home</a>
        <a href="javascript:;">News</a>
        <a href="javascript:;">Contact</a>
      </div>
      <div class="content">
        <h3>Sticky Navigation</h3>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
        <p>2222</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'narbarSticky',
  data() {
    return {
      offsetTop: 0,
      doSticky: false,
    };
  },
  mounted() {
    this.offsetTop = this.$refs.navbar.offsetTop;
    console.log('offsetTop: ', this.offsetTop);
  },
  methods: {
    wheelHandler() {
      console.log(this.$refs.scroll.scrollTop);
      if (this.$refs.scroll.scrollTop > this.offsetTop) {
        this.doSticky = true;
      } else {
        this.doSticky = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-container {
  max-height: 300px;
  position: relative;
  border: 1px solid green;
  overflow: auto;
}
.navbar {
  overflow: hidden;
  background: #333;
  a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    &:hover {
      background-color: #ddd;
      color: black;
    }
    &.active {
      background-color: #4caf50;
      color: white;
    }
  }
}
.sticky {
  position: fixed;
  top: 49px;
  width: inherit;
  max-width: inherit;
}
</style>
