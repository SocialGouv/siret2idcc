# siret2idcc

![](https://i.imgur.com/gSe54sx.png)

A very simple API that exposes a file that maps SIRETs to IDCCs.

Available at https://siret2idcc.fabrique.social.gouv.fr/api/v2/80258570300027

The raw data is also available on [data.gouv.fr](https://www.data.gouv.fr/fr/datasets/liste-des-conventions-collectives-par-entreprise-siret/) and you can explore it in [Etalab studio](https://explore.etalab.studio/?url=https://github.com/SocialGouv/siret2idcc/blob/master/data/WEEZ.csv?raw=true).

Conventions data is extracted from [kali-data](https://github.com/SocialGouv/kali-data).

:warning: Usage interne, aucune garantie sur les données.

## API Server

To start the server:

    yarn start

In production, you can use:

    NODE_ENV=production PORT=8023 yarn start

### SIRET search `/api/v2/:siret`

`curl https://siret2idcc.fabrique.social.gouv.fr/api/v2/82161143100015`

Or with multiple sirets : `curl https://siret2idcc.fabrique.social.gouv.fr/api/v2/82161143100015,80258570300027`

It will return a JSON array :

```json
[
    {
        "siret": "82161143100015",
        "conventions": [
            {
                "active": true,
                "date_publi": "1988-01-01T00:00:00.000Z",
                "etat": "VIGUEUR_ETEN",
                "id": "KALICONT000005635173",
                "mtime": 1556652289,
                "nature": "IDCC",
                "num": "1486",
                "texte_de_base": "KALITEXT000005679895",
                "title": "Convention collective nationale des bureaux d'études techniques, des cabinets d'ingénieurs-conseils et des sociétés de conseils du 15 décembre 1987. ",
                "effectif": 857061,
                "shortTitle": "Bureaux D'études Techniques",
                "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635173"
            }
        ]
    },
    {
        "siret": "80258570300027",
        "conventions": [
            {
                "active": true,
                "date_publi": "1997-12-07T00:00:00.000Z",
                "etat": "VIGUEUR_ETEN",
                "id": "KALICONT000005635534",
                "mtime": 1562700340,
                "nature": "IDCC",
                "num": "1979",
                "texte_de_base": "KALITEXT000005670044",
                "title": "Convention collective nationale des hôtels, cafés restaurants (HCR) du 30 avril 1997",
                "effectif": 580085,
                "shortTitle": "Hôtels Cafés Restaurants (Hcr)",
                "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635534"
            }
        ]
    }
]
```

### Données renvoyées

Toutes les données renvoyées sont issues de la [base KALI de la DILA](https://www.data.gouv.fr/fr/datasets/kali-conventions-collectives-nationales/)

Champ            | Description
-----------------|-----------------------------------------------------------------------------
active           | La convention est-elle encore active ?
date_publi       | Date de mise à jour de la convention
etat             | Etat de la convention : VIGUEUR ou VIGUEUR_ETEN (étendue)
id               | Identifiant interne (DILA) de la convention
nature           | Toujours IDCC (ID de convention collective)
num              | Numéro IDCC
texte_de_base    | Identifiant interne (DILA) du texte de base de la convention collective
title            | Titre historique de la convention collective
shortTitle       | Titre abrégé
url              | URL de la convention sur legifrance

## Tests

```sh
  PASS  src/__test__/server.v2.test.js
  ✓ e2e : empty call should return 404 (35ms)
  ✓ e2e : /api/v2/82161143100015 should return convention (14ms)
  ✓ e2e : unknown siret should return empty array (3ms)
  ✓ e2e : invalid siret (1ms)
  ✓ e2e : /api/v2/82161143100015,82161143100016,82161143100017 should return conventions (2ms)
  ✓ e2e : /api/v2/82161143100015,xxx,82161143100123,11111111111111 should return conventions (2ms)

 PASS  src/__test__/server.v1.test.js
  ✓ e2e : empty call should return 404 (3ms)
  ✓ e2e : /api/v1/82161143100015 should return convention (3ms)
  ✓ e2e : unknown siret should return empty array (2ms)
  ✓ e2e : invalid siret should return 422 (1ms)

 PASS  src/__test__/getConventions.test.js
  ✓ can get conventions for 82161143100015 (2ms)
  ✓ can get conventions for 81431448000017
  ✓ can get conventions for 44858080300022 (1ms)

 PASS  src/__test__/parseWeez.test.js
  ✓ should parse weez content correctly (1ms)
  ✓ should group idcc correctly (1ms)

 PASS  src/__test__/normalizeIdcc.test.js
  ✓ 0 should normalize as 0000 (1ms)
  ✓ 5 should normalize as 0005
  ✓ 12 should normalize as 0012
  ✓ 123 should normalize as 0123
  ✓ 1234 should normalize as 1234 (1ms)
  ✓ 12345 should normalize as 12345

 PASS  src/__test__/getConventionUrl.test.js
  ✓ should return correct Legifrance url (1ms)

Test Suites: 6 passed, 6 total
Tests:       22 passed, 22 total
Snapshots:   15 passed, 15 total
Time:        1.421s
```

