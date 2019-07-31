const fs = require("fs");

const parseWeez = contents => {
  const rows = contents
    .split("\n")
    .slice(1)
    .map(row => row.split(",").map(cell => cell.trim()))
    .filter(([mois, siret, idcc, date]) => idcc !== "0")
    .filter(([mois, siret, idcc, date]) => !!idcc)
    .filter(([mois, siret, idcc, date]) => !!siret);

  const sirets = {};
  rows.forEach(([mois, siret, idcc, date]) => {
    if (sirets[siret] && !sirets[siret].includes(idcc)) {
      sirets[siret].push(idcc);
    } else {
      sirets[siret] = [idcc];
    }
  });
  return sirets;
};

module.exports = parseWeez;
