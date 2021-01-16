const getConventions = require("../getConventions");

const tests = ["82161143100015", "81431448000017", "44858080300022"];

tests.forEach((input) => {
  test(`can get conventions for ${input}`, async () => {
    // timeout due to asynchronous data load
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(getConventions(input)).toMatchSnapshot();
  });
});
