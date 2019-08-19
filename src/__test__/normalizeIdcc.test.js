const normalizeIdcc = require("../normalizeIdcc");

const tests = [
  ["0", "0000"],
  ["5", "0005"],
  ["12", "0012"],
  ["123", "0123"],
  ["1234", "1234"],
  ["12345", "12345"]
];

tests.forEach(input => {
  test(`${input[0]} should normalize as ${input[1]}`, () => {
    expect(normalizeIdcc(input[0])).toEqual(input[1]);
  });
});
