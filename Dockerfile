# STAGE 1

FROM node:18.15.0-alpine3.16 As build
WORKDIR /app
COPY package.json ./
RUN npm install

COPY . /app

RUN npm run build

# STAGE 2

FROM nginx:stable-alpine3.17-slim

#RUN cd /var/www/ && mkdir frontendReact

COPY --from=build /app/build /usr/share/nginx/html/

COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]