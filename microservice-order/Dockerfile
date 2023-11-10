FROM node:20-alpine

WORKDIR /app/order

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 8080 

CMD ["node", "./Config/db.js"]