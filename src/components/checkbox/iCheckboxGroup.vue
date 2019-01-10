<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from '@js/assist';
import emitter from '@js/emitter';

export default {
  name: 'iCheckboxGroup',
  mixins: [emitter],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentValue: this.value,
      childrens: [],
    };
  },
  methods: {
    updateModel(update) {
      this.childrens = findComponentsDownward(this, 'iCheckbox');
      console.log('childrens: ', this.childrens);
      if (this.childrens) {
        const { value } = this;
        this.childrens.forEach((child) => {
          child.model = value;
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit('input', data);
      this.$emit('on-change', data);
      // 有group的话，就是group触发form校验
      this.$emit('iFormItem', 'on-form-change', data);
    },
  },
  mounted() {
    this.updateModel(true);
  },
  watch: {
    value() {
      this.updateModel(true);
    },
  },
};
</script>

