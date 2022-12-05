FROM public.ecr.aws/bitnami/node:14 AS builder

WORKDIR /usr/src/app

COPY package.*json ./

# copy tsconfig
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN yarn run build

FROM nginx:alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

ENTRYPOINT ["nginx", "-g", "daemon off;"]


