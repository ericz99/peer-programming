FROM public.ecr.aws/bitnami/node:14 AS builder

WORKDIR /usr/src/app

# copy packge lock over
COPY package*.json yarn.lock ./

# copy tsconfig
COPY tsconfig.json ./

COPY . .

RUN yarn install && yarn build

FROM public.ecr.aws/bitnami/node:14 AS deps

WORKDIR /usr/src/app

RUN yarn install --production

FROM public.ecr.aws/bitnami/node:14

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules/

COPY --from=builder /usr/src/app/dist ./dist/

# expose port
EXPOSE 5002

# ENV NODE_ENV=production

# RUN chmod +x startup.sh
# RUN npm i -g sequelize-cli
# RUN npm i -g nodemon

# run node index.js
# CMD [ "npm", "run", "start-build" ]
ENTRYPOINT [ "node", "dist/index.js" ]
