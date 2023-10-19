import index from "@/router/index";

const expectedPaths = [
  "",
  "/coaches",
  "/coaches/:id/contact",
  "/coaches/:id",
  "/register",
  "/requests",
  "/:notFound(.*)",
];

describe("indexRouter.vue", () => {
  it("7 paths", () => {
    expect(index.getRoutes().length).toBe(7);
  });

  it("paths are equal to expectedpaths", () => {
    let paths = [];
    index.getRoutes().forEach((route) => {
      paths.push(route.path);
    });
    expect(paths).toEqual(expectedPaths);
  });
});
