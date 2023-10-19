import { shallowMount } from "@vue/test-utils";
import BaseCard from "@/components/UI/BaseCard.vue";

describe("BaseCard.vue", () => {
  const wrapper = shallowMount(BaseCard);

  it("the component existexists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("has a div and its only one", () => {
    const div = wrapper.findAll("div");
    expect(div.exists()).toBe(true);
    expect(div.length === 1);
  });

  it("has the card clss", () => {
    const div = wrapper.find("div");
    expect(div.classes().toString()).toMatch("card");
  });
});
