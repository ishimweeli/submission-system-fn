FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build


FROM  nginx:stable-alpine-slim

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/asst3 /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]