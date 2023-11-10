FROM node:20-alpine

WORKDIR /app/product

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 8080 

CMD ["node", "./Config/db.js"]