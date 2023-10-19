import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  getters,
  actions,
  mutations,
};
