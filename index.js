const express = require('express')
const cors = require("cors")
const betterSQLite3 = require('better-sqlite3');

const SQLITE_PATH = './data/siret_idcc.sqlite';

const db = betterSQLite3(SQLITE_PATH);
const companiesQuery = db.prepare(`
  SELECT DISTINCT companies.siret, companies.name
  FROM companies
  WHERE companies.siret LIKE ? || '%'
  LIMIT 20
`)
const companyQuery = db.prepare(`
  SELECT companies.siret, companies.name, companies.idcc_num, idcc.titre
  FROM companies
  LEFT JOIN idcc ON companies.idcc_num = idcc.num
  WHERE companies.siret = ?
`)

const app = express()
app.use(cors())

const port = process.env.PORT || 3000;

app.get(
  '/api/v1/company/:siret',
  (req, res) => {
    const siret = req.params.siret;
    if (!siret || siret === '') {
      return res.status(422).json({error: 'No SIRET given in the request'});
    }

    const matches = companyQuery.all(siret);
    if (matches.length == 0) {
      return res.status(404).send({error: 'No company found for this SIRET'});
    }

    const baseCompany = {
      'siret': matches[0].siret,
      'name': matches[0].name,
    };
    const idccList = matches.
      filter(match => match.idcc_num !== "9999").
      map(match => ({num: match.idcc_num, titre: match.titre}));
    return res.json({ company: { ...baseCompany, idccList }});
  }
)

app.get(
  '/api/v1/companies',
  (req, res) => {
    const siret = req.query.siret;
    if (!siret || siret === '') {
      return res.status(422).json({error: 'No SIRET given in the query params'});
    }

    const matches = companiesQuery.all(siret);
    if (matches.length == 0) {
      return res.status(404).send({error: 'No company found for a similar SIRET'});
    }

    return res.json({ companies: matches });
  }
)

app.listen(port, () => console.log(`siret2idcc API listening on port ${port}!`))
