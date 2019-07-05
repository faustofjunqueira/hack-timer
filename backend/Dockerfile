FROM node:12.6.0 as BUILD

RUN mkdir /app

COPY ./config /app/config
COPY ./gulpfile.js /app/gulpfile.js
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./src /app/src
COPY ./tsconfig.json /app/tsconfig.json 

WORKDIR /app

RUN npm i && npm run build

FROM node:alpine as MAIN
RUN mkdir /app
COPY --from=BUILD /app/config /app/config
COPY --from=BUILD /app/package.json /app/package.json
COPY --from=BUILD /app/package-lock.json /app/package-lock.json
COPY --from=BUILD /app/js /app/js

ENV NODE_ENV=production

WORKDIR /app

RUN npm install 

EXPOSE 10000

USER node

CMD node ./js/index.js