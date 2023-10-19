import Vue from "vue";
import App from "./App.vue";
import BaseBadge from "./components/UI/BaseBadge.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseCard from "./components/UI/BaseCard.vue";
import BaseSpinner from "./components/UI/BaseSpinner.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.component("base-card", BaseCard);
Vue.component("base-button", BaseButton);
Vue.component("base-badge", BaseBadge);
Vue.component("base-spinner", BaseSpinner);
Vue.component("base-dialog", BaseDialog);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
