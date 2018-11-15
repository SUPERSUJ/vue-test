<script>
import foo from './foo';

export default {
  name: 'vueHooks',
  render(h) {
    return h('div', [h(foo), h(foo)]);
  },
};
</script>
