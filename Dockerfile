# STAGE 1

FROM node:18.15.0-alpine3.16 As build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . /app
RUN npm run build

# STAGE 2

FROM nginx:stable-alpine

RUN cd /var/www/ && mkdir frontendReact

COPY --from=build /app/build /var/www/frontendReact/

COPY --from=build /app/frontend-react-posts/reactFrontend/nginx/* /etc/nginx/sites-enabled/

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]