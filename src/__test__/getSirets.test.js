const getSirets = require("../getSirets");

test("should parse weez content correctly", done => {
  setTimeout(() => {
    expect(getSirets()).toMatchSnapshot();
    done();
  }, 500);
});
