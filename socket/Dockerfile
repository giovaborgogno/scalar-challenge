FROM node:18-alpine
WORKDIR /app

COPY  package.json package-lock.json ./
RUN  npm install
COPY .env.docker ./.env
COPY . .

EXPOSE 4000

CMD ["npm","start"]