# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm i --omit=dev

COPY --from=build /app/dist ./dist

## Download the RDS CA certificate
RUN mkdir -p /app/certs && \
  wget -O /app/certs/global-bundle.pem https://truststore.pki.rds.amazonaws.com/us-east-1/us-east-1-bundle.pem

EXPOSE 3000

CMD ["node", "dist/index.js"]