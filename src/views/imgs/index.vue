<template>
  <div>
    <zoom-in></zoom-in>
    <zoom-in2></zoom-in2>
    <zoom-out></zoom-out>
    <zoom-out2></zoom-out2>
    <shine></shine>
  </div>
</template>

<script>
import zoomIn from './components/zoomIn';
import zoomIn2 from './components/zoomIn2';
import zoomOut from './components/zoomOut';
import zoomOut2 from './components/zoomOut2';
import shine from './components/shine';

export default {
  name: 'imgs',
  components: {
    zoomIn,
    zoomIn2,
    zoomOut,
    zoomOut2,
    shine,
  },
};
</script>
