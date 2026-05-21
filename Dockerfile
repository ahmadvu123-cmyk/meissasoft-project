FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 👇 IMPORTANT: build-time dummy value
ENV DATABASE_URL="postgresql://postgres:BeggulXgHmqelLUSTnnbBpQafrwbEBzj@postgres.railway.internal:5432/railway"

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]