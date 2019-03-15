import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawerIsOpen: false
  },
  mutations: {
    TOGGLE_DRAWER_STATE(state) {
      state.drawerIsOpen = !state.drawerIsOpen;
    }
  },
  actions: {
    toggleDrawer({ commit }) {
      commit("TOGGLE_DRAWER_STATE");
    }
  },
  getters: {
    getDrawerState(state) {
      return state.drawerIsOpen;
    }
  }
});
