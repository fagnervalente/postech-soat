FROM node:18-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json tsconfig.json ./
COPY . .
RUN npm install 

EXPOSE 3000
CMD npm run dev