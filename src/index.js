const express = require("express");
const cors = require("cors");

const getConventions = require("./getConventions");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const isValidSiret = siret => siret && siret.match(/^\d{14}$/);

// 82161143100015
app.get("/api/v1/:siret", (req, res) => {
  const siret = req.params.siret;
  if (!siret || siret.length != 14) {
    return res
      .status(422)
      .json({ error: "invalid SIRET given in the request" });
  }
  const results = getConventions(siret);
  return res.json(results);
});

// 82161143100015,82161143100016,82161143100017
app.get("/api/v2/:sirets", (req, res) => {
  const sirets = req.params.sirets;
  const nums = sirets.split(",");
  const results = nums.map(num => ({
    siret: num,
    conventions: (isValidSiret(num) && getConventions(num)) || []
  }));
  return res.json(results);
});

app.get("/healthz", (req, res) => {
  return res.json({ success: true });
});

if (require.main === module) {
  app.listen(port, () =>
    console.log(`siret2idcc API listening on http://127.0.0.1:${port}`)
  );
}

module.exports = app;
