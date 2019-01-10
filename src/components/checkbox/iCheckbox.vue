<template>
  <label>
    <span>
      <input
        type="checkbox"
        v-if="group"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="change">
      <input
        type="checkbox"
        v-else
        :disabled="disabled"
        :checked="currentValue"
        @change="change">
    </span>
  </label>
</template>

<script>
import { findComponentUpward } from '@js/assist';
import emitter from '@js/emitter';

export default {
  name: 'iCheckbox',
  mixins: [emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    label: {
      type: [String, Number, Boolean],
    },
  },
  data() {
    return {
      currentValue: this.value, // 对应true false
      model: [], // 对应数组
      group: false,
      parent: null,
    };
  },
  mounted() {
    this.parent = findComponentUpward(this, 'iCheckboxGroup');
    if (this.parent) {
      this.group = true;
    }
    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return false;
      }
      const checked = event.target.checked;
      this.currentValue = checked;
      const value = checked ? this.trueValue : this.falseValue;
      this.$emit('input', value);
      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit('on-change', value);
        // 没有group,就是自己触发form校验
        this.dispatch('iFormItem', 'on-form-change', value);
      }
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    },
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw new Error('Value should be trueValue or falseValue');
      }
    },
  },
};
</script>
