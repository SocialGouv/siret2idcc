const getConventions = require("../getConventions");

const tests = ["82161143100015", "81431448000017", "44858080300022"];

tests.forEach(input => {
  test(`can get conventions for ${input}`, () => {
    expect(getConventions(input)).toMatchSnapshot();
  });
});
