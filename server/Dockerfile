FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

COPY tsconfig.json ./

COPY . .

RUN yarn install && yarn build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --production

COPY --from=builder /usr/src/app/dist ./

USER node

EXPOSE 5002

ENV NODE_ENV=production

# RUN chmod +x startup.sh
# RUN npm i -g sequelize-cli
# RUN npm i -g nodemon

# run node index.js
# CMD [ "npm", "run", "start-build" ]
ENTRYPOINT [ "node", "dist/index.js" ]
