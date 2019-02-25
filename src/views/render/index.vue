<template>
  <div>
    <my-component :fn="fn"></my-component>
  </div>
</template>

<script>
import myComponent from './myComponent';

export default {
  components: {
    myComponent,
  },
  data() {
    return {
      fn: function(h) {
        return h('div', {
          style: {
            color: 'red',
          },
        }, '自定义内容');
      },
    };
  },
};
</script>
