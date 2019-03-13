# siret2idcc

![](https://i.imgur.com/gSe54sx.png)

A very simple API that exposes a file that maps SIRETs to IDCCs

The project has two components:
- A python extraction script that goes through the original CSV and stores it into a SQLite database
- A barebones NodeJS Express API that queries the generated SQLite database

## Original Data

The original data is not yet Open Data, so we cannot publish it here.

Meanwhile, make sure you retrieve it somehow and copy it to `data/extraction_etablissements_idcc.csv`.

## Data extraction

Install dependencies:

```
cd data
pip install -r requirements.txt
```

To prepare the data from the original CSV:

    python prepare_data.py

(there is an `--output` option that defaults to `sqlite` but you can also choose `csv`)

To play around with the notebook:

    jupyter notebook

## API Server

To start the server:

    yarn start

In production, you can use:

    NODE_ENV=production PORT=8023 yarn start

The only route that exists so far is : `/api/v1/company/:siret`

It will return a JSON object that looks like:

```json
{
  "company": {
    "siret": "84526029800011",
    "name": "OUT OF SCREEN-75020-PARIS",
    "idccList": ["0650"]
  }
}
```

The `idccList` can be:

- an array with a single item, that's the most common and easy case
- an array with multiple items, for companies that have employees working with multiple Conventions
- an empty array when we don't know the IDCC or it has not been set yet (that's the code `9999` from our source)
