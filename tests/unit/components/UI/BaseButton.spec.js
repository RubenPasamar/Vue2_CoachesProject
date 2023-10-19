import { shallowMount, createLocalVue } from "@vue/test-utils";
import BaseButton from "@/components/UI/BaseButton";
import VueRouter from "vue-router";
import router from "@/router";

const localVue = createLocalVue();
localVue.use(VueRouter);

const mode = "outline";
const to = {
  name: "coach",
  params: {
    id: "c2",
  },
};

describe("BaseButton.vue", () => {
  function mountComponent(link) {
    return shallowMount(BaseButton, {
      localVue,
      router,
      propsData: {
        mode: mode,
        link: link,
        to: to,
      },
    });
  }

  it("if link undefined router-link must not exist", () => {
    const router = mountComponent(false).find("router-link");
    expect(router.exists()).toBe(false);
  });

  it("if link undefined button mus exist", () => {
    const button = mountComponent(false).find("button");
    expect(button.exists()).toBe(true);
  });

  it("if link not undefined router-link must exist", () => {
    const router = mountComponent(true).find("router-link-stub");
    expect(router.exists()).toBe(true);
  });

  it("check classes === mode in button", () => {
    const button = mountComponent(false).find("button");
    expect(button.classes("outline")).toBe(true);
  });

  it("check classes === mode in router", () => {
    const router = mountComponent(true).find("router-link-stub");
    expect(router.classes("outline")).toBe(true);
  });
});
