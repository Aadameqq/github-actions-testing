FROM node:18-alpine
WORKDIR /home/app

COPY ./package*.json ./

RUN npm ci prisma

CMD ["npx", "prisma", "db", "push", "--skip-generate"]
