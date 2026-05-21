FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./
COPY nest-cli.json ./

# 🔥 FIRST generate prisma
RUN npx prisma generate

# THEN build
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]