# siret2idcc

![](https://i.imgur.com/gSe54sx.png)

A very simple API that exposes a file that maps SIRETs to IDCCs

## API Server

To start the server:

    yarn start

In production, you can use:

    NODE_ENV=production PORT=8023 yarn start

The only route that exists so far is : `/api/v1/:siret`

It will return a JSON object that looks like:

```json
["1486"]
```

