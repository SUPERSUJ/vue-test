<template>
  <div>
    <div>{{ $root._rootFilters(product_type, 'productTypeSelect')}}</div>
    <div>{{ numberFilters(nubmer, 'number') }}</div>
  </div>
</template>

<script>
export default {
  name: 'filters',
  data() {
    return {
      // eslint-disable-next-line vue/no-reserved-keys
      product_type: '3',
      nubmer: '1',
      filtersData: {
        // number: [
        //   {
        //     name: '一',
        //     id: '1',
        //   },
        //   {
        //     name: '二',
        //     id: '2',
        //   },
        //   {
        //     name: '三',
        //     id: '3',
        //   },
        // ],
      },
    };
  },
  mounted() {
    console.log('this: ', this);
    console.log('this.$root: ', this.$root);
    setTimeout(() => {
      this.filtersData.number = [
        {
          name: '一',
          id: '1',
        },
        {
          name: '二',
          id: '2',
        },
        {
          name: '三',
          id: '3',
        },
      ];
    }, 4000);
  },
  methods: {
    numberFilters(id, key) {
      if (this.filtersData[key]) {
        const item = this.filtersData[key].find(item => item.id === id);
        return item.name;
      }
      return id;
    },
  },
};
</script>
