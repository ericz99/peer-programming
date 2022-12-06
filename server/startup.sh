#!/bin/bash

yarn run db:create
yarn run db:migrate
node index.js