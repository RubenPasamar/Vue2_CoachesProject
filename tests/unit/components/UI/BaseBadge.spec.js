import { shallowMount } from "@vue/test-utils";
import BaseBadge from "@/components/UI/BaseBadge";

const areas = ["frontend", "backend", "career"];
/**
 * 0:frontend,
 * 1:backend,
 * 2:career
 */

describe("BaseBadge.vue", () => {
  function mountComponent(areaNumber) {
    return shallowMount(BaseBadge, {
      propsData: {
        type: areas[areaNumber],
        title: areas[areaNumber],
      },
    });
  }

  it("Span tag should exist", () => {
    const span = mountComponent(0).find("span");
    expect(span.exists()).toBe(true);
  });

  it("Span tag class", () => {
    const span = mountComponent(1).find("span");
    expect(span.classes()[1]).toMatch("backend");
  });

  it("Span tag text should equal type prop", () => {
    const span = mountComponent(2).find("span");
    expect(span.text()).toMatch(areas[2].toUpperCase());
  });
});
