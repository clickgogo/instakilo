FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3300

ENV PORT=3300
ENV NODE_ENV=production
ENV USER_DATABASE_URL="postgresql://postgres:thisIsMyBankPassword4Real@localhost:5432/instakiloUserDB?schema=public"
ENV JWT_SECRET="Eux8Db4aBaqF8fpdVP5vyhEazfpR"
ENV REFRESH_JWT_SECRET="5D7D8aY^Yxaty4=nQU4vQ&smHrwU%Ne"

CMD ["npm", "start"]
