FROM node:20-alpine

WORKDIR /app

# Install system dependencies (important for Prisma + some native modules)
RUN apk add --no-cache openssl libc6-compat

# 1. Copy only package files first (better caching)
COPY package*.json ./

# 2. Install dependencies
RUN npm install

# 3. Copy full project (src + prisma + everything)
COPY . .

# 4. Generate Prisma Client
RUN npx prisma generate

# 5. Build NestJS
RUN npm run build

# 6. Expose app port
EXPOSE 3000

# 7. Run migrations + start app (production safe)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]