# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# #COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 6063
# USER node
# CMD ["npm", "start"]

FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7000

CMD ["node", "index.js"]