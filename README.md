# siret2idcc [![pipeline status](https://gitlab.factory.social.gouv.fr/SocialGouv/siret2idcc/badges/master/pipeline.svg)](https://gitlab.factory.social.gouv.fr/SocialGouv/siret2idcc/commits/master)

![](https://i.imgur.com/gSe54sx.png)

A very simple API that exposes a file that maps SIRETs to IDCCs.

Available at https://siret2idcc.incubateur.social.gouv.fr/api/v1/80258570300027

## API Server

To start the server:

    yarn start

In production, you can use:

    NODE_ENV=production PORT=8023 yarn start

The only route that exists so far is : `/api/v1/:siret`

It will return a JSON object that looks like:

```json
{
  "idcc": ["1486"]
}
```

