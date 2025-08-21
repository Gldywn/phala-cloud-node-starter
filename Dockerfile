FROM node:22.18.0-alpine AS builder
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22.18.0-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm i --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000/tcp
CMD ["node", "dist/index.js"]
