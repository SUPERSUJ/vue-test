<template>
  <div>
    <component :is="data"></component>
  </div>
</template>

<script>
export default {
  name: 'testIs',
  data() {
    return {
      data: {
        name: 'testIsProp',
        data() {
          return {
            text: 1,
          };
        },
        methods: {
          add1() {
            this.text += 1;
          },
        },
        template: `
          <div>
            {{text}}
            <el-button size="small" type="primary" @click="add1">add1</el-button>
          </div>
        `,
      },
    };
  },
};
</script>
