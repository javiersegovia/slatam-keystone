ARG NODE_VERSION=12.10.0-alpine
ARG DUMB_INIT_VERSION=1.2.2

# Base container
FROM node:${NODE_VERSION} AS build

ARG DUMB_INIT_VERSION
WORKDIR /slatam/api

RUN apk add --update --no-cache build-base python2 && \
  wget -O bin/dumb-init -q https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64 && \
  chmod +x bin/dumb-init

COPY package*.json ./
RUN npm ci
ADD . .

# Uncomment for Continous Deployment
# RUN npm run lint
# RUN npm run build
# RUN npm run test

RUN npm prune --production

# Runtime container
FROM node:${NODE_VERSION}
WORKDIR /slatam/api

ENV PORT=8080
EXPOSE $PORT

COPY --from=build /slatam/api /slatam/api

ENTRYPOINT ["bin/dumb-init", "--"]

# TODO: Test NPM or Kubernetes for App Deployment