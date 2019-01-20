<template>
  <el-select
    ref="select"
    v-model="val"
    :loading="loading"
    size="small"
    filterable
    remote
    reserve-keyword
    clearable
    placeholder="请输入"
    :remote-method="getOptions"
    class="branch-select">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
const data = [{
  id: 0,
  name: 0,
}, {
  id: 1,
  name: 1,
}, {
  id: 2,
  name: 2,
}, {
  id: 3,
  name: 3,
}, {
  id: 4,
  name: 4,
}, {
  id: 5,
  name: 5,
}, {
  id: 6,
  name: 6,
}, {
  id: 7,
  name: 7,
}, {
  id: 8,
  name: 8,
}, {
  id: 9,
  name: 9,
}, {
  id: -1,
  name: '加载中...',
}];

export default {
  name: 'scrollRequestSelect',
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      val: [],
      options: [],
      loading: false,
      scrollTimer: null,
    };
  },
  watch: {
    value(val) {
      if (this.options.length) {
        this.val = val;
      }
    },
    val(val) {
      this.$emit('input', val);
    },
  },
  created() {
    this.getOptions();
  },
  mounted() {
    console.log(this);
    console.log(this.$refs.select);
    console.log(this.$refs.select.$refs.popper);
    let comSelf = this;
    let scrollFn = function(event) {
      event = event || window.event;
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
      let scrollElem = this;
      if (comSelf.scrollTimer !== null) {
        clearTimeout(comSelf.scrollTimer);
      }
      comSelf.scrollTimer = setTimeout(function () {
        if (Math.ceil(scrollElem.scrollHeight - scrollElem.scrollTop) === scrollElem.clientHeight) {
          console.log('getData');
          comSelf.getData();
        }
      }, 3000);
    };
    this.$refs.select.$refs.popper.$el.querySelector('.el-select-dropdown__wrap').addEventListener('scroll', scrollFn, false);
    this.$on('hook:beforeDestroy', () => {
      console.log('hook:beforeDestroy');
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
        this.scrollTimer = null;
      }
      this.$refs.select.$refs.popper.$el.querySelector('.el-select-dropdown__wrap').removeEventListener('scroll', scrollFn, false);
    });
  },
  methods: {
    getOptions() {
      this.loading = true;
      window.setTimeout(() => {
        this.loading = false;
        this.options = data;
      }, 5000);
    },
    getData() {
      let last = this.options.pop();
      let len = this.options.length;
      for (let i = 1; i <= 10; i++) {
        let id = len + i;
        this.options.push({
          id: id,
          name: id,
        });
      }
      this.options.push(last);
    },
  },
};
</script>

<style lang="scss" scoped>
  .branch-select {
    width: 300px;
  }
</style>
