FROM node:17-alpine

WORKDIR /app

RUN chown node:node /app

COPY package.json .
COPY yarn.lock .

ENV NODE_ENV=production

# we dont need kali-data itself in the docker image
RUN yarn install --production --frozen-lockfile && rm -rf node_modules/@socialgouv/kali-data/data/KALI*.json

COPY . .

USER 1000

ENTRYPOINT ["yarn", "start"]