FROM node:12-alpine

WORKDIR /app

COPY . .

RUN yarn --frozen-lockfile

ENTRYPOINT ["yarn", "start"]