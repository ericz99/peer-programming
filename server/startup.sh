#!/bin/bash

yarn run db:create
yarn run db:migrate
node dist/index.js