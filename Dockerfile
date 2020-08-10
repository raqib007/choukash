
FROM nginx:1.17.1-alpine
COPY /dist/choukash /usr/share/nginx/html
RUN npm install @angular/cli && npm install && npm run build



# FROM node:10 AS ui-build
# WORKDIR /usr/src/app
# COPY my-app/ ./my-app/
# RUN npm install @angular/cli && npm install && npm run build