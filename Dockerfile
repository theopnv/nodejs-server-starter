FROM node:15 as builder
WORKDIR /usr/src/app

COPY . .
RUN npm install typescript@4.0.5 -g --silent
RUN npm install && npm run build

FROM node:15-alpine as runtime-container
WORKDIR /usr/src/app
ARG SERVER_PORT

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=prod

EXPOSE ${SERVER_PORT}
CMD ["node", "./dist/server.js"]
