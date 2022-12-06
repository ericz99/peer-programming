FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

COPY tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn run build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

COPY startup.sh .

RUN yarn install --production

COPY --from=builder /usr/src/app/dist .

# USER node

EXPOSE 5002

ENV NODE_ENV=production

RUN chmod +x startup.sh
RUN npm i -g sequelize-cli

# # run node index.js
# # CMD [ "npm", "run", "start-build" ]
# ENTRYPOINT [ "node", "dist/index.js" ]
ENTRYPOINT [ "./startup.sh"]
