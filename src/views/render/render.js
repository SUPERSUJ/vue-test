export default {
  functional: true,
  props: {
    fn: Function,
  },
  render(h, ctx) {
    return ctx.props.fn(h);
  },
};
