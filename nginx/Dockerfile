# STAGE 1

FROM node:18.15.0-alpine3.16 As build
WORKDIR /app
COPY . /app/
RUN yarn
RUN yarn build
# RUN npm install
# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "start"]

# STAGE 2

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=buid /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]