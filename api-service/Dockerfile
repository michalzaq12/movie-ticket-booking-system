FROM node:8-alpine

EXPOSE 3030

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY src src/

CMD ["sh", "-c", "npm start" ]

