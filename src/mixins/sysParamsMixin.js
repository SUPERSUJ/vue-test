export default {
  data() {
    return {
      a: 12,
      _filterFunc: null,
      _sysParams: null,
      _sysParamsPromise: null,
    };
  },
  methods: {
    /* 注册过滤器到_filterFunc中 */
    _getSysParamsFunc() {
      console.log('enter _getSysParamsFunc');
      const { $data } = this;
      let promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            productTypeSelect: [
              {
                name: '支付宝',
                id: '1',
              },
              {
                name: '微信',
                id: '2',
              },
              {
                name: '京东',
                id: '3',
              },
            ],
            goodTypeSelect: [
              {
                name: '普通',
                id: '1',
              },
              {
                name: '特惠',
                id: '2',
              },
            ],
          });
        }, 5000);
      });
      let ret = $data._sysParamsPromise || ($data._sysParamsPromise = promise
        .then((data) => {
          this.$data._sysParams = data;
          this.$data._filterFunc = {};
          Object.keys(data).forEach((paramKey) => {
            this.$data._filterFunc[paramKey] = (val) => {
              const tar = data[paramKey].find(item => item.id === val);
              return tar && tar.name || '';
            };
          });
          return data;
        })
        .catch(err => console.error(err, ' in src/mixins/sysParamsMixin.js')));
      return ret;
    },

    /* 按照键值获取单个过滤器 */
    _rootFilters(id, key) {
      // console.log('this.$data._filterFunc: ', this.$data._filterFunc);
      // console.log('this.$data._sysParamsPromise: ', this.$data._sysParamsPromise);
      if (!this.$data._filterFunc && !this.$data._sysParamsPromise) {
        this._getSysParamsFunc();
      }
      const func = this.$data._filterFunc;
      const mth = func && func[key];
      return mth && mth(id) || id;
    },

    /* 获取数据字典 */
    _getSysParams() {
      return this.$data._sysParams;
    },
  },
};
