### STAGE 1: Build ###
FROM node:18.14.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY ./src ./src
COPY angular.json tsconfig.app.json tsconfig.json tsconfig.spec.json ./

RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/rick-and-morty-website /usr/share/nginx/html
