FROM node:18-alpine AS builder-deps
WORKDIR /home/app

COPY ./package*.json ./

RUN npm ci

COPY . .

FROM builder-deps AS builder
RUN npm run gen-swagger
RUN npm run compile

FROM node:18-alpine AS runtime
WORKDIR /home/app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app

COPY ./package*.json ./

RUN npm ci

COPY ./prisma ./prisma
RUN npx prisma generate

USER app

COPY --from=builder /home/app/dist ./src
COPY ./tsconfig.json ./

EXPOSE $PORT

CMD ["node","-r","tsconfig-paths/register", "./src/http/server.js"]
