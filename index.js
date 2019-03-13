const express = require('express')
const betterSQLite3 = require('better-sqlite3');

const SQLITE_PATH = './data/siret_idcc.sqlite';

const db = betterSQLite3(SQLITE_PATH);
const query = db.prepare('SELECT * FROM companies WHERE SIRET=?')

const app = express()
const port = process.env.PORT || 3000;

app.get(
  '/api/v1/company/:siret',
  (req, res) => {
    const siret = req.params.siret;
    if (!siret || siret === '') {
      return res.status(422).json({error: 'No SIRET given in the request'});
    }

    const matches = query.all(siret);
    if (matches.length == 0) {
      return res.status(404).send({error: 'No company found for this SIRET'});
    }

    const baseCompany = {
      'siret': matches[0].SIRET,
      'name': matches[0].name
    };
    const idccList = matches.map(m => m.IDCC).filter(idcc => idcc !== "9999");
    return res.json({ company: { ...baseCompany, idccList: null }});
  }
)

app.listen(port, () => console.log(`siret2idcc API listening on port ${port}!`))
