import { shallowMount, createLocalVue } from "@vue/test-utils";
import CoachItem from "@/components/coaches/CoachItem.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseBadge from "@/components/UI/BaseBadge.vue";
import router from "@/router";
import VueRouter from "vue-router";

const item = {
  id: "c1",
  firstName: "Maximilian",
  lastName: "Schwarzmüller",
  areas: ["frontend", "backend", "career"],
  description:
    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
  hourlyRate: 30,
};

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("CoachItem.vue", () => {
  const wrapper = shallowMount(CoachItem, {
    localVue,
    router,
    propsData: {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      areas: item.areas,
      description: item.description,
      rate: item.hourlyRate,
    },
    components: {
      BaseButton: BaseButton,
      BaseBadge: BaseBadge,
    },
    computed: {
      fullName: () => {
        return "Maximilian Schwarzmüller";
      },
    },
  });

  it("Should match Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should have same base-badge as areas", () => {
    const baseBadges = wrapper.findAll("base-badge-stub");
    expect(baseBadges.length).toEqual(item.areas.length);
  });

  it("Should have 2 base-buttons", () => {
    const baseButtons = wrapper.findAll("base-button-stub");
    expect(baseButtons.length).toBe(2);
  });

  it("Should not have text base-badge's components", () => {
    const baseBadge = wrapper.findAll("base-badge-stub");
    for (let i = 0; i < baseBadge.length; i++) {
      expect(baseBadge.at(i).text()).toMatch("");
    }
  });

  it("Should have text base-button components", () => {
    const baseBadge = wrapper.findAll("base-badge-stub");
    for (let i = 0; i < baseBadge.length; i++) {
      expect(baseBadge.at(i).text()).toMatch("");
    }
  });

  it("render hourlyRate", () => {
    expect(wrapper.find("h4").text()).toBe("$30/hour");
  });
});
