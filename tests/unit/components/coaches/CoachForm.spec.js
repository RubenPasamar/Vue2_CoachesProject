import { shallowMount } from "@vue/test-utils";
import CoachForm from "@/components/coaches/CoachForm.vue";
//import BaseButton from "@/components/UI/BaseButton.vue";

const data = [
  ["Ruben", true],
  ["Pasamar", true],
  ["Hacketonto", true],
  [33, true],
  [[], true],
  ["formIsValid"],
];
const dataNames = [
  "firstName",
  "lastName",
  "description",
  "rate",
];

const dataNamesCheckBoxes = ["frontend", "backend", "career"];

describe("CoachForm.vue", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(CoachForm, {
      stubs: ["base-button"],
    });
  });

  it("Should match Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should exist input firstname", () => {
    const input = wrapper.find("#firstname");
    expect(input.exists()).toBe(true);
  });

  it("Should set the value to firstname", async () => {
    const input = wrapper.find("#firstname");
    await input.setValue("Ruben");
    expect(wrapper.vm.firstName.val).toBe("Ruben");
    expect(wrapper.vm.firstName.val).toBe(input.element.value);
  });

  it("Should set value of all inputs EXCEPT checkboxes", async () => {
    const inputs = wrapper.findAll("input");
    for (let i = 0; i < 2; i++) {
      await inputs.at(i).setValue(data[i][0]);
      expect(wrapper.vm[dataNames[i]].val).toBe(data[i][0]);
    }
  });

  it("Should be able to check all checkboxes", async () => {
    const checkboxes = wrapper.findAll("input[type='checkbox']");
    for (let i = 0; i < checkboxes.length; i++) {
      await checkboxes.at(i).setChecked();
      expect(checkboxes.at(i).element.checked).toBeTruthy();
    }
  });

  it("Should sumbit form", async () => {
    const mockedFormSubmit = jest.spyOn(CoachForm.methods, [
      "submitForm",
    ]);
    let wrapper = shallowMount(CoachForm, {
      stubs: ["base-button"],
    });

    await wrapper.find("#firstname").setValue("firstnamevalue!!");
    await wrapper.find("#lastname").setValue("lastnamevalue!!");
    await wrapper
      .find("#description")
      .setValue("descriptionvalue!!");
    await wrapper.find("#rate").setValue("ratevalue!!");
    await wrapper.find("#frontend").setChecked();
    await wrapper.find("#backend").setChecked();
    await wrapper.find("#career").setChecked();

    await wrapper.find("form").trigger("submit.prevent");

    expect(mockedFormSubmit).toHaveBeenCalledTimes(1);
  });

  it("Should emit save-data event", async () => {
    let wrapper = shallowMount(CoachForm, {
      stubs: ["base-button"],
    });
    wrapper.vm.validateForm = jest.fn();

    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.emitted("save-data")).toBeTruthy();
  });

  it("Should validateForm to false", () => {
    wrapper.vm.validateForm();

    expect(wrapper.vm.$data.formIsValid).toBeFalsy();

    wrapper.vm.$data.firstName.val = "John";
    wrapper.vm.$data.lastName.val = "Johnlastname";
    wrapper.vm.$data.description.val = "descriptionvalue";
    wrapper.vm.$data.rate.val = 30;
    wrapper.vm.$data.areas.val = ["frontend", "backend"];

    wrapper.vm.validateForm();

    expect(wrapper.vm.$data.formIsValid).toBeTruthy();
  });
});
