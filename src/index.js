const express = require("express");
const cors = require("cors");
const fs = require("fs");

const parseWeez = require("./parseWeez");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const inFile = process.env.DATA_FILE || `./data/WEEZ.csv`;

const sirets = parseWeez(fs.readFileSync(inFile).toString());

app.get("/api/v1/:siret", (req, res) => {
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
  return res.json({ idcc: match });
});

app.listen(port, () =>
  console.log(`siret2idcc API listening on http://127.0.0.1:${port}`)
);
