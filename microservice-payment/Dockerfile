FROM node:20-alpine

WORKDIR /app/payment

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 5002 

CMD ["node", "./Config/db.js"]