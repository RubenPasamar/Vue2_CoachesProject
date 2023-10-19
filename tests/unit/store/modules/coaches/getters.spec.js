import getters from "@/store/modules/coaches/getters.js";
import index from "@/store/modules/coaches/index.js";

const expectedCoaches = [
  {
    id: "c1",
    firstName: "Maximilian",
    lastName: "Schwarzmüller",
    areas: ["frontend", "backend", "career"],
    description:
      "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
    hourlyRate: 30,
  },
  {
    id: "c2",
    firstName: "Julie",
    lastName: "Jones",
    areas: ["frontend", "career"],
    description:
      "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
    hourlyRate: 30,
  },
];

describe("coaches.getters", () => {
  it("coaches state", () => {
    const coaches = getters.coaches(index.state());
    expect(coaches).toEqual(expectedCoaches);
  });

  it("has coaches", () => {
    const coaches = getters.hasCoaches(index.state());
    expect(coaches).toEqual(true);
  });
});
