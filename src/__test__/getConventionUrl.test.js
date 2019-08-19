const getConventionUrl = require("../getConventionUrl");

test(`should return correct Legifrance url`, () => {
  expect(getConventionUrl("KALICONT000005635173")).toEqual(
    "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635173"
  );
});
