const state = {
  sidebar: false,
  appStatus: "display",
  print: {
    value: false,
    width: undefined,
    height: undefined,
    dim0: undefined,
    dim1: undefined,
    format: undefined,
    loading: false
  }
};
const getters = {
  appStatus: state => state.appStatus,
  sidebar: state => state.sidebar,
  print: state => state.print
};
const mutations = {
  UPDATE_APP_STATUS(state, payload) {
    state.appStatus = payload;
  },
  UPDATE_SIDEBAR(state, payload) {
    state.sidebar = payload;
  },
  UPDATE_PRINT(state, payload) {
    state.print = payload;
  }
};
const actions = {
  updateAppStatus({ commit }, payload) {
    commit("UPDATE_APP_STATUS", payload);
  },
  updateSidebar({ commit }, payload) {
    commit("UPDATE_SIDEBAR", payload);
  },
  updatePrint({ commit }, payload) {
    commit("UPDATE_PRINT", payload);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
