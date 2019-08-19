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
  "results": [
    {
      "active": true,
      "date_publi": "1997-12-07T00:00:00.000Z",
      "etat": "VIGUEUR_ETEN",
      "id": "KALICONT000005635534",
      "mtime": 1562700340,
      "nature": "IDCC",
      "num": "1979",
      "texte_de_base": "KALITEXT000005670044",
      "titre": "Convention collective nationale des hôtels, cafés restaurants (HCR) du 30 avril 1997",
      "effectif": 580085
    }
  ]
}
```
