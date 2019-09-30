FROM node:12-alpine

WORKDIR /app

RUN chown node:node /app

COPY . .

RUN yarn --frozen-lockfile

USER node

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]