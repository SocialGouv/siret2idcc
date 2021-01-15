FROM node:15-alpine

WORKDIR /app

RUN chown node:node /app

COPY package.json .
COPY yarn.lock .

ENV NODE_ENV=production

RUN yarn install --production --frozen-lockfile

COPY . .

USER node

ENTRYPOINT ["yarn", "start"]