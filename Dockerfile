FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run builder

COPY --from=builder /package*.json ./
COPY --from=builder /dist ./dist

RUN npm install --only=production

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]