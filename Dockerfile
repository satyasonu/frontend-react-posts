FROM node:18.15.0-alpine3.16
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]