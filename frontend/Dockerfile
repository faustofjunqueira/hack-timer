FROM node:12.4.0 AS NODE_BUILDER

RUN npm install -g serve && mkdir /app
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./public /app/public
WORKDIR /app
RUN npm install && npm run build

EXPOSE 80

CMD  ["serve", "-p", "80", "-s", "./build"]