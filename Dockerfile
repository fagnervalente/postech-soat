FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
EXPOSE 3000

CMD [ "node", "src/server.ts" ]