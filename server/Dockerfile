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

COPY /dist .

EXPOSE 5002

# run node index.js
CMD [ "npm", "run", "start-build" ]