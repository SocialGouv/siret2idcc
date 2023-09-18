FROM node:18-alpine3.18@sha256:982b5b6f07cd9241c9ebb163829067deac8eaefc57cfa8f31927f4b18943d971

WORKDIR /app

RUN chown node:node /app

COPY package.json .
COPY yarn.lock .

ENV NODE_ENV=production

# we dont need kali-data itself in the docker image
RUN yarn install --production --frozen-lockfile && yarn cache clean && rm -rf node_modules/@socialgouv/kali-data/data/KALI*.json

COPY . .

USER 1000

ENTRYPOINT ["yarn", "start"]
