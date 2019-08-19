const express = require("express");
const cors = require("cors");

const getConventions = require("./getConventions");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

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

if (require.main === module) {
  app.listen(port, () =>
    console.log(`siret2idcc API listening on http://127.0.0.1:${port}`)
  );
}

module.exports = app;
