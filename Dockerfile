# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=12.10.0
# https://github.com/Yelp/dumb-init/releases
ARG DUMB_INIT_VERSION=1.2.2

# Base container
FROM node:${NODE_VERSION}-alpine AS base
ARG DUMB_INIT_VERSION
WORKDIR /home/api

RUN apk add --no-cache build-base python2 yarn && \
  wget -O bin/dumb-init -q https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64 && \
  chmod +x bin/dumb-init
ADD . /home/api
RUN yarn install && yarn build && yarn cache clean

# Runtime container
FROM node:${NODE_VERSION}-alpine AS production
WORKDIR /home/api
COPY --from=base /home/api /home/api

ENTRYPOINT ["bin/dumb-init", "--"]
EXPOSE 8080

# # Dev container
# FROM node:${NODE_VERSION}-alpine AS dev
