<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import emitter from '@js/emitter';

export default {
  name: 'iInput',
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentValue: '',
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  methods: {
    handleInput(e) {
      const value = e.target.value;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('iFormItem', 'on-form-change', value);
    },
    handleBlur() {
      this.dispatch('iFormItem', 'on-form-blur', this.currentValue);
    },
  },
};
</script>

