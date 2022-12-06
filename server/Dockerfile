FROM node:14-alpine AS builder

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

COPY tsconfig.json ./

COPY . .

RUN yarn install && yarn build

FROM node:14-alpine AS deps

WORKDIR /usr/src/app

RUN yarn install --production

FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules/

COPY --from=builder /usr/src/app/dist ./

# expose port
EXPOSE 5002

# ENV NODE_ENV=production

# RUN chmod +x startup.sh
# RUN npm i -g sequelize-cli
# RUN npm i -g nodemon

# run node index.js
# CMD [ "npm", "run", "start-build" ]
ENTRYPOINT [ "node", "dist/index.js" ]
