FROM node:21.6.0-alpine

WORKDIR /usr/src/collaboration-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "server"]