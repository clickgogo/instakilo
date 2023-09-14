FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3300

ENV PORT=3300
ENV NODE_ENV=production

CMD ["npm", "start"]
