FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

# copy tsconfig
COPY tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

ENV VIRTUAL_HOST=peer-programming.ericzhang.xyz

ENV LETSENCRYPT_HOST=peer-programming.ericzhang.xyz

ENV VIRTUAL_PORT=80

ENTRYPOINT ["nginx", "-g", "daemon off;"]


