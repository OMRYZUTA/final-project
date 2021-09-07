FROM node:16.4.0-alpine as builder

ARG API_URL

ENV REACT_APP_HOST_IP_ADDRESS $API_URL

WORKDIR /frontend
COPY frontend /frontend

RUN npm ci --production
RUN npm run build

FROM nginx:latest

COPY nginx-proxy.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/build /var/www/frontend
