FROM node:22-alpine3.22 AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:22-alpine3.22
WORKDIR /app
VOLUME ["/db"]
ENV DATABASE_URL=/db/local.db
ENV PORT=3000
ENV ORIGIN=http://0.0.0.0:3000
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/drizzle drizzle/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]