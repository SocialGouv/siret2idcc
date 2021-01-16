const kali = require("@socialgouv/kali-data/data/index.json");

const getSirets = require("./getSirets");
const getConventionUrl = require("./getConventionUrl");

const sirets = getSirets();

const getConvention = (idcc) =>
  kali.find((cc) => parseInt(cc.num, 10) === parseInt(idcc, 10));

const getConventions = (siret) => {
  const match = sirets[siret];
  if (!match || match.length === 0) {
    return [];
  }
  const results = match
    // get convention data
    .map(getConvention)
    // remove empty results
    .filter(Boolean)
    // add url field
    .map((convention) => ({
      ...convention,
      url: getConventionUrl(convention.id),
    }));

  return results;
};

module.exports = getConventions;
