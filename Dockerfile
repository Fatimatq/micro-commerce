FROM node:20-alpine

WORKDIR /app/clientui

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 3000 

CMD ["node", "./Config/db.js"]