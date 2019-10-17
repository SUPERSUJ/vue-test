import store from 'store';

const app = {
  state: {
    sidebar: {
      opened: store.get('sidebarStatus') || false, // 导航栏状态, false是展开
    },
    testMapGetters: false,
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      store.set('sidebarStatus', !state.sidebar.opened);
      state.sidebar.opened = !state.sidebar.opened;
    },
    ACTION_A(state) {
      state.testMapGetters = !state.testMapGetters;
      console.log('ACTION_A');
      return 'ACTION_A';
    },
  },
  actions: {
    toggle_sidebar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    // actions 相互调用
    actionA({ commit }) {
      // setTimeout(() => {
      //   console.log(1);
      //   commit('ACTION_A');
      // }, 1000);

      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(1);
          console.log(commit('ACTION_A'));
          resolve('hello');
        }, 1000);
      });
    },
    actionB({ dispatch }) {
      dispatch('actionA').then((data) => {
        console.log(data);
        console.log(2);
      });
    },
  },
};

export default app;
