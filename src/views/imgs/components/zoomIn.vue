<template>
  <div>
    <figure>
      <img src="../../../assets/imgs/bird.jpg" alt="">
    </figure>
    <span>zoomIn</span>
  </div>
</template>

<script>
export default {
  name: 'zoomIn',
};
</script>

<style lang="scss" scoped>
div {
  position: relative;
  display: inline-block;
  width: 300px;
  height: 200px;
  margin: 0 0 0 25px;
  padding: 0;
  figure {
    width: 300px;
    height: 200px;
    margin: 0;
    padding: 0;
    background: #ffffff;
    overflow: hidden;
    &:hover {
      + span {
        bottom: -36px;
        opacity: 1;
      }
      img {
        transform: scale(1.3);
      }
    }
  }
  img {
    transform: scale(1);
    transition: all .3s ease-in-out;
  }
  span {
    position: absolute;
    bottom: -2px;
    left: 0;
    z-index: -1;
    display: block;
    width: 300px;
    margin: 0;
    padding: 0;
    color: #444;
    font-size: 18px;
    text-decoration: none;
    text-align: center;
    transition: .3s ease-in-out;
    opacity: 0;
  }
}
</style>
