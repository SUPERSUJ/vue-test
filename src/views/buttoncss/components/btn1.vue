<template>
  <div class="button" @mousemove="mousemove"></div>
</template>

<script>
export default {
  name: 'btn1',
  methods: {
    mousemove(e) {
      const target = e.target;
      const clientX = e.clientX;
      const clientY = e.clientY;
      const rect = target.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      e.target.style.setProperty('--x', `${x}px`);
      e.target.style.setProperty('--y', `${y}px`);
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  margin: 10px;
  width: 300px;
  height: 80px;
  position: relative;
  appearance: none;
  background: #f72359;
  padding: 1em 2em;
  border: none;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  border-radius: 100px;

  span {
    position: relative;
  }

  &::before {
    --size: 0;
    content: '';
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background: radial-gradient(circle closest-side, #4405f7, transparent);
    transform: translate(-50%, -50%);
    transition: width .2s ease, height .2s ease;
  }

  &:hover::before {
    --size: 300px;
  }
}
</style>
