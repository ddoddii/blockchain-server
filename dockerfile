FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3333

RUN npx prisma generate

CMD ["npm", "run","start:dev"]