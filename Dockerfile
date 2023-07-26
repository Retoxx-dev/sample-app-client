FROM node:16.15.0-alpine AS build
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY --chown=node:node ./sample-app-client/package.json ./sample-app-client/package-lock.json ./
RUN npm ci
COPY --chown=node:node ./sample-app-client ./
RUN npm run build


FROM nginx:1.21-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build .
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]