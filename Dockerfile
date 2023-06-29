FROM node:18.16.0-slim

WORKDIR /usr/app

COPY . .

EXPOSE 3001

RUN npm install

CMD ["npm", "run", "start:dev"]