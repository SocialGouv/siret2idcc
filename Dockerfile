FROM node:18-alpine AS node

WORKDIR /app
RUN chown node:node /app
ENV NODE_ENV=production
USER 1000

FROM node AS build
COPY yarn.lock .yarnrc.yml ./
COPY --chown=1000:1000 .yarn .yarn
RUN yarn fetch --immutable

COPY --chown=1000:1000 . .
RUN yarn build
RUN yarn workspaces focus --production \
  && yarn cache clean \
  && rm -rf node_modules/@socialgouv/kali-data/data/KALI*.json # we dont need kali-data itself in the docker image

FROM node AS server
COPY --from=build /app /app


ENTRYPOINT ["yarn", "start"]