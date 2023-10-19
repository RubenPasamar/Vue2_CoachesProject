import coachesActions from "./actions";
import coachesMutations from "./mutations";
import coachesGetters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [],
    };
  },
  actions: coachesActions,
  mutations: coachesMutations,
  getters: coachesGetters,
};
