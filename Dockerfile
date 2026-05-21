FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./
COPY nest-cli.json ./



RUN npx prisma generate

RUN npm run build


EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]