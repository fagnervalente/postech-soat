FROM node:18-alpine

WORKDIR /usr/app
COPY package.json tsconfig.json ./
COPY . .
RUN npm install

EXPOSE 3000
CMD npm run dev