# STAGE 1

FROM node:18.15.0-alpine3.16 As build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
# EXPOSE 3000
# CMD ["npm", "start"]

# STAGE 2

FROM node:18.15.0-alpine3.16

WORKDIR /app

RUN npm install -g webserver.local

COPY --from=build /app/build ./build

EXPOSE 3000

CMD webserver.local -d ./build