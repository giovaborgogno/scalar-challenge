FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production
COPY  package*.json ./
RUN  npm install
COPY . .

EXPOSE 4000

CMD ["node","index.js"]