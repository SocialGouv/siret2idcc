const getConventions = require("../getConventions");

const tests = ["82161143100015", "81431448000017", "44858080300022"];

tests.forEach(input => {
  test(`can get conventions for ${input}`, done => {
    // timeout due to asynchronous data load
    setTimeout(() => {
      expect(getConventions(input)).toMatchSnapshot();
      done();
    }, 500);
  });
});
