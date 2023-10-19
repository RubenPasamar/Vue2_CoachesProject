import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import App from "@/App.vue";
import CoachesPage from "@/views/coaches/CoachesList.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);

let routes = [
  {
    path: "/coaches",
    component: CoachesPage,
  },
];

describe("App.vue", () => {
  it("renders a child component via routing", async () => {
    const router = new VueRouter({ routes });
    const wrapper = shallowMount(App, {
      localVue,
      router,
    });

    router.push("/coaches");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#app"));
  });
});
