<template>
  <div>
    <i-render :fn="fn"></i-render>
  </div>
</template>

<script>
import render from './render';

export default {
  components: {
    'i-render': render,
  },
  props: {
    fn: Function,
  },
};
</script>
