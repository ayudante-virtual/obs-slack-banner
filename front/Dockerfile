FROM node:14.16.0-alpine3.13 as build

# Don't hardcode CWD
ARG CWD=/app

# Set workdir
WORKDIR "$CWD"

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Webapp url parameters
ARG REACT_APP_WEBAPP_PORT=5000
ARG REACT_APP_WEBAPP_HOSTNAME=localhost

# Compile app
COPY . .
RUN npm run build

# ----------------------------------
# production
# ----------------------------------
FROM nginx:1.19.8-alpine as production

# Install jq to dump env later
RUN apk update && apk add --no-cache jq

# Copy replacement script
COPY prod/replace_env_variables.sh /docker-entrypoint.d/

# Copy prod config
COPY prod/nginx.conf.template /etc/nginx/templates/default.conf.template

# Set workdir
WORKDIR /www/data

# Get CWD
ARG CWD=/app

# Copy the previously installed dependencies
COPY --from=build "$CWD/build" .
