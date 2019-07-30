const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const fs = require("fs");

const formatMonth = num => (num < 10 ? "0" + num : num);

// Map : JavaScript heap out of memory
const parseWeezFile1 = inPath => {
  const contents = fs.readFileSync(inPath).toString();

  const rows = contents
    .split("\n")
    .slice(1)
    .map(row => row.split(",").map(cell => cell.trim()))
    .filter(([mois, siret, idcc, date]) => idcc !== "0");

  const sirets = new Map();
  rows.forEach(([mois, siret, idcc, date]) => {
    if (!sirets.has(siret)) {
      sirets.set(siret, [idcc]);
    } else {
      const s = sirets.get(siret);
      s.push(idcc);
    }
  });

  return sirets;
};

const parseWeezFile = inPath => {
  const contents = fs.readFileSync(inPath).toString();

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

const inFile = `./data/WEEZ.csv`;

const sirets = parseWeezFile(inFile);

app.get("/api/v1/company/:siret", (req, res) => {
  const siret = req.params.siret;
  if (!siret || siret === "" || siret.length != 14) {
    return res
      .status(422)
      .json({ error: "invalid SIRET given in the request" });
  }
  const match = sirets[siret];
  if (!match || match.length === 0) {
    return res.status(404).send({ error: "No IDCC found for this SIRET" });
  }
  return res.json(match);
});

app.listen(port, () =>
  console.log(`siret2idcc API listening on http://127.0.0.1:${port}`)
);
