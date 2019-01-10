<template>
  <div>
    <h3>动态渲染</h3>
    <i-display :code="code"></i-display>
  </div>
</template>

<script>
import iDisplay from '@components/iDisplay';
import code from './code';

export default {
  components: {
    iDisplay,
  },
  data() {
    return {
      code: code,
    };
  },
};
</script>
