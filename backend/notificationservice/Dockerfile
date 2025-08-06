FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN apk update && apk upgrade && npm install
COPY . .
EXPOSE 5003
CMD [ "node", "index.js" ]
