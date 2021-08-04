FROM node:14

WORKDIR /usr/src/mockpass

COPY package* ./

RUN npm ci

COPY . ./

EXPOSE 5156

CMD ["node", "index.js"]
