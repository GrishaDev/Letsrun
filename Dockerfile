  
FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]