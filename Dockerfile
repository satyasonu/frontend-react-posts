# STAGE 1

FROM node:18.15.0-alpine3.16 As build
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . /app
RUN yarn build
# RUN npm install
# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "start"]

# STAGE 2

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]