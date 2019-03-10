<template>
  <div style="height: 300px; overflow: auto; border: 1px solid yellow;" @scroll="scrollHandle">
    <div id="navbar" ref="navBar">
      <a href="javascript:;">Home</a>
      <a href="javascript:;">News</a>
      <a href="javascript:;">Contact</a>
    </div>
    <div style="padding:15px 15px 2500px;font-size:30px;margin-top:30px;">
      <p><b>This example demonstrates how to hide a navbar when the user starts to scroll the page.</b></p>
      <p>Scroll down this frame to see the effect!</p>
      <p>Scroll up to show the navbar.</p>
      <p>Lorem ipsum dolor dummy text sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor dummy text sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbarHideScroll',
  data() {
    return {
      prevScrollPos: 0,
    };
  },
  mounted() {
    this.prevScrollPos = this.$refs.navBar.parentNode.scrollTop;
  },
  methods: {
    scrollHandle(e) {
      let currentScrollPos = e.currentTarget.scrollTop;
      if (currentScrollPos < this.prevScrollPos) {
        this.$refs.navBar.style.top = '0';
      } else {
        this.$refs.navBar.style.top = '-50px';
      }
      this.prevScrollPos = currentScrollPos;
    },
  },
};
</script>

<style lang="scss" scoped>
#navbar {
  background: #333;
  position: fixed;
  top: 0;
  width: 100%;
  display: block;
  transition: top .3s;
  a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 15px;
    text-decoration: none;
    font-size: 17px;
    &:hover {
      background: #ddd;
      color: black;
    }
  }
}
</style>
