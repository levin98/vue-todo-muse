import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawerIsOpen: false,
    username: ""
  },
  mutations: {
    TOGGLE_DRAWER_STATE(state) {
      state.drawerIsOpen = !state.drawerIsOpen;
    },
    LOG_IN(state, { user }) {
      state.username = user;
    },
    LOG_OUT(state) {
      state.username = "";
    }
  },
  actions: {
    toggleDrawer({ commit }) {
      commit("TOGGLE_DRAWER_STATE");
    },
    login({ commit }, { username }) {
      commit("LOG_IN", { user: username });
    },
    logout({ commit }) {
      commit("LOG_OUT");
    }
  },
  getters: {
    getDrawerState(state) {
      return state.drawerIsOpen;
    },
    getUsername(state) {
      return state.username;
    }
  }
});
