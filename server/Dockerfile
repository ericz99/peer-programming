FROM public.ecr.aws/bitnami/node:14 AS builder

WORKDIR /usr/src/app

# copy packge lock over
COPY package*.json ./

# copy tsconfig
COPY tsconfig.json ./

COPY . .

RUN yarn install --production && yarn build

FROM public.ecr.aws/bitnami/node:14

USER node

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.json ./

COPY .sequelizerc ./

COPY startup.sh ./

COPY src/migrations /usr/src/app/migrations

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/node_modules ./node_modules

# expose port
EXPOSE 5002

ENV NODE_ENV=production

RUN chmod +x startup.sh
RUN npm i -g sequelize-cli
RUN npm i -g nodemon

# run node index.js
# CMD [ "npm", "run", "start-build" ]
ENTRYPOINT [ "./startup.sh"]
