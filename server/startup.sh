#!/bin/bash

yarn run db:create
yarn run db:migrate
yarn run start-build