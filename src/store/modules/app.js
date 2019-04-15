const state = {
  sidebar: false,
  appStatus: "display"
};
const getters = {
  appStatus: state => state.appStatus,
  sidebar: state => state.sidebar
};
const mutations = {
  UPDATE_APP_STATUS(state, payload) {
    state.appStatus = payload;
  },
  UPDATE_SIDEBAR(state, payload) {
    state.sidebar = payload;
  }
};
const actions = {
  updateAppStatus({ commit }, payload) {
    commit("UPDATE_APP_STATUS", payload);
  },
  updateSidebar({ commit }, payload) {
    commit("UPDATE_SIDEBAR", payload);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
