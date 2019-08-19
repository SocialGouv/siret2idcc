const parseWeez = contents => {
  const rows = contents
    .split("\n")
    .slice(1)
    .map(row => row.split(",").map(cell => cell.trim()))
    .filter(([, , idcc]) => idcc !== "0")
    .filter(([, , idcc]) => !!idcc)
    .filter(([, siret, ,]) => !!siret);

  const sirets = {};
  rows.forEach(([, siret, idcc]) => {
    if (sirets[siret] && !sirets[siret].includes(idcc)) {
      sirets[siret].push(idcc);
    } else {
      sirets[siret] = [idcc];
    }
  });
  return sirets;
};

module.exports = parseWeez;
