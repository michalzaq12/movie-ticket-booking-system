FROM node:8-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY src src/

CMD ["sh", "-c", "npm start" ]