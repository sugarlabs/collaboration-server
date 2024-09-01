FROM node:21.6.0-alpine

WORKDIR /usr/src/dmps

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "server"]