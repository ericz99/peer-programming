FROM public.ecr.aws/bitnami/node:14

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

# expose port
EXPOSE 5002

RUN chmod +x startup.sh
RUN npm i -g sequelize-cli
RUN npm i -g nodemon

# run node index.js
# CMD [ "npm", "run", "start-build" ]
ENTRYPOINT [ "./startup.sh" ]
