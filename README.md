# siret2idcc [![pipeline status](https://gitlab.factory.social.gouv.fr/SocialGouv/siret2idcc/badges/master/pipeline.svg)](https://gitlab.factory.social.gouv.fr/SocialGouv/siret2idcc/commits/master)

![](https://i.imgur.com/gSe54sx.png)

A very simple API that exposes a file that maps SIRETs to IDCCs.

Available at https://siret2idcc.incubateur.social.gouv.fr/api/v1/80258570300027

:warning: Usage interne, aucune garantie sur les données.

## API Server

To start the server:

    yarn start

In production, you can use:

    NODE_ENV=production PORT=8023 yarn start

The only route that exists so far is : `/api/v1/:siret`

It will return a JSON array :

```json
[
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
        "effectif": 580085,
        "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635534"
    }
]
```

## Tests

```sh
PASS getConventions.test.js (6.152s)
✓ can get conventions for 82161143100015 (5ms)
✓ can get conventions for 81431448000017 (1ms)
✓ can get conventions for 44858080300022

PASS server.test.js (6.404s)
✓ e2e : /api/v1/82161143100015 should return convention (22ms)
✓ e2e : unknown siret should return empty array (4ms)
✓ e2e : invalid siret should return 422 (2ms)

PASS getConventionUrl.test.js
✓ should return correct Legifrance url (3ms)

PASS normalizeIdcc.test.js
✓ 0 should normalize as 0000 (1ms)
✓ 5 should normalize as 0005
✓ 12 should normalize as 0012
✓ 123 should normalize as 0123 (1ms)
✓ 1234 should normalize as 1234
✓ 12345 should normalize as 12345

PASS parseWeez.test.js
✓ should parse weez content correctly (2ms)
✓ should group idcc correctly (1ms)
```
