FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
RUN npm install


COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./
COPY nest-cli.json ./

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]