<template>
  <div>
    <h3>checkbox</h3>
    <h4>单个</h4>
    <i-checkbox v-model="single">单个选项</i-checkbox>
    <p>single: {{single}}</p>
    <h4>多个</h4>
    <i-checkbox-group v-model="multiple">
      <i-checkbox label="option1">option1</i-checkbox>
      <i-checkbox label="option2">option2</i-checkbox>
      <i-checkbox label="option3">option3</i-checkbox>
      <i-checkbox label="option4">option4</i-checkbox>
      <i-checkbox label="option5">option5</i-checkbox>
    </i-checkbox-group>
    <p>multiple: {{multiple}}</p>
  </div>
</template>
<script>
import iCheckboxGroup from '@components/checkbox/iCheckboxGroup';
import iCheckbox from '@components/checkbox/iCheckbox';

export default {
  name: 'checkbox',
  components: { iCheckboxGroup, iCheckbox },
  data() {
    return {
      single: false,
      multiple: ['option1'],
    };
  },
};
</script>
