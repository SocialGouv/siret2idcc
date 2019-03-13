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

    const foundCompany = query.get(siret);
    if (!foundCompany) {
      return res.status(404).send({error: 'No company found for this SIRET'});
    }

    return res.json({'company': foundCompany});
  }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
