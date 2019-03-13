const express = require('express')

const fs = require('fs');
const parse = require('csv-parse');

const CSV_PATH = './data/siret_idcc.csv';

var mapping = {};
fs.createReadStream(CSV_PATH)
  .pipe(parse({columns: true}))
  .on('data', function(row) {
      mapping[row.SIRET] = {'IDCC': row.IDCC, 'name': row.name};
  })
  .on('end',function() {
    //do something wiht mapping
    console.log('done loading CSV !');
  });


const app = express()
const port = 3000

app.get(
  '/api/v1/company/:siret',
  (req, res) => {
    const siret = req.params.siret;
    if (!siret || siret === '') {
      return res.status(422).json({error: 'No SIRET given in the request'});
    }

    const foundCompany = mapping[req.params.siret];
    if (!foundCompany) {
      return res.status(404).send({error: 'No company found for this SIRET'});
    }

    return res.json({'company': foundCompany});
  }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
