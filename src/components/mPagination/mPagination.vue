<template>
  <el-row class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      :page-sizes="[6, 9, 12, 15]"
      @current-change="toPage"
      :current-page.sync="mPage"
      :page-size="mPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-row>
</template>

<script>
export default {
  name: 'm-pagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // 默认页码是1，每页数量是9
      mPage: 1,
      mPageSize: 9,
    };
  },
  methods: {
    handleSizeChange(page_size) {
      this.mPage = 1;
      this.$emit('handleFn', {
        page_size,
        page: 1,
      });
    },
    toPage(page) {
      this.$emit('handleFn', { page });
    },
    setData(page) {
      this.mPage = page;
      this.toPage(page);
    },
  },
};
</script>

// <m-pagination :total="total" @handleFn="search"></m-pagination>
