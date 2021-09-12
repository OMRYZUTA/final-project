FROM node:16.4.0-alpine as builder

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm ci --production

COPY public public
COPY src src
RUN npm run build

FROM nginx:1.21.1-alpine

COPY nginx-proxy.conf.template /etc/nginx/templates/nginx-proxy.conf.template
COPY --from=builder /frontend/build /var/www/frontend
