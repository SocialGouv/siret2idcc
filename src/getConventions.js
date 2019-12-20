const fs = require("fs");
const path = require("path");
const kali = require("@socialgouv/kali-data/data/index.json");

const parseWeez = require("./parseWeez");
const getConventionUrl = require("./getConventionUrl");

const inFile =
  process.env.DATA_FILE || path.join(__dirname, `../data/WEEZ.csv`);

const sirets = parseWeez(fs.readFileSync(inFile).toString());

const getConvention = idcc =>
  kali.find(cc => parseInt(cc.num, 10) === parseInt(idcc, 10));

const getConventions = siret => {
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
    .map(convention => ({
      ...convention,
      url: getConventionUrl(convention.id)
    }));

  return results;
};

module.exports = getConventions;
