<template>
  <div>
    <figure>
      <img src="../../../assets/imgs/bird.jpg" alt="">
    </figure>
    <span>shine</span>
  </div>
</template>

<script>
export default {
  name: 'shine',
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
    position: relative;
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
    }
    &::before {
      position: absolute;
      top: 0;
      left: -75%;
      z-index: 2;
      display: block;
      content: '';
      width: 18%;
      height: 100%;
      background: linear-gradient(to right, rgba(255, 255, 255, .3), rgba(255, 255, 255, .3) 100%);
      transform: skewX(-25deg);
    }
    &:hover::before {
      animation: shine .75s;
    }
  }
  img {
    width: 300px;
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

@keyframes shine {
  100% {
    left: 125%;
  }
}
</style>
