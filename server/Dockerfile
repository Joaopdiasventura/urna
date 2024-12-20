ARG NODE_VERSION=22.11.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm run build

USER node

EXPOSE 3000

CMD npm run start:prod
