FROM node:12.4.0 AS NODE_BUILDER

RUN mkdir /app
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./public /app/public
WORKDIR /app
RUN npm install && npm run build

FROM httpd:2.4

RUN echo "Run"
COPY ./.htaccess /usr/local/apache2/htdocs 
COPY --from=NODE_BUILDER /app/build /usr/local/apache2/htdocs

EXPOSE 8080