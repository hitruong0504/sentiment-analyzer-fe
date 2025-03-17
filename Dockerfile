## build stage ##
FROM node:18.18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

## run stage ##
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]