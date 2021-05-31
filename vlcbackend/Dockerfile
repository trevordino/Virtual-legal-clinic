FROM node:15

WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

EXPOSE 8080

CMD ["npm", "start"]