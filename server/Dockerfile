FROM public.ecr.aws/bitnami/node:14 as builder

WORKDIR /usr/src/app

# copy packge lock over
COPY package*.json ./

# copy tsconfig
COPY tsconfig.json ./

# run clean install production
RUN npm install

COPY . .

# build dist
RUN npm run build

FROM public.ecr.aws/bitnami/node:14

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.json ./

COPY startup.sh ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./

# expose port
EXPOSE 5002

ENV NODE_ENV=production

RUN chmod +x startup.sh
RUN npm i -g sequelize-cli
RUN npm i -g nodemon

# run node index.js
# CMD [ "npm", "run", "start-build" ]
ENTRYPOINT [ "./startup.sh" ]
