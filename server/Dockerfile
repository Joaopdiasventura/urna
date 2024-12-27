ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-alpine as builder

RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:${NODE_VERSION}-alpine as runner

RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json .

USER node

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
