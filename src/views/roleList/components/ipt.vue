<template>
  <el-input
    v-model.trim="val"
    size="mini"
    placeholder="amount3"/>
</template>

<script>
export default {
  name: 'ipt',
  props: {
    value: Number,
    parentindex: Number,
  },
  data() {
    return {
      val: this.value,
      timer: null,
    };
  },
  watch: {
    val: {
      handler(val) {
        this.$emit('input', val);
        if (this.timer) {
          return;
        }
        this.timer = setTimeout(() => {
          this.$emit('changeTotal', this.parentindex, this.val);
          clearTimeout(this.timer);
          this.timer = null;
        }, 500);
      },
      immediate: true,
    },
  },
};
</script>
