FROM node:16.4.0-alpine as builder

ARG API_URL

ENV REACT_APP_HOST_IP_ADDRESS $API_URL

WORKDIR /frontend
COPY . .

RUN npm ci --production
RUN npm run build

FROM nginx:1.21.1-alpine

COPY nginx-proxy.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/build /var/www/frontend
