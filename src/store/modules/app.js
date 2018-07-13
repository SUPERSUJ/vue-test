import store from 'store';

const app = {
  state: {
    sidebar: {
      opened: store.get('sidebarStatus') || false, // 导航栏状态, false是展开
    },
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      store.set('sidebarStatus', !state.sidebar.opened);
      state.sidebar.opened = !state.sidebar.opened;
    },
  },
  actions: {
    toggle_sidebar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
  },
};

export default app;
