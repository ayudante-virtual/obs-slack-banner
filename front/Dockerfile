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
FROM halverneus/static-file-server as production

# Set workdir
WORKDIR /web

# Get CWD
ARG CWD=/app

# Copy the previously installed dependencies
COPY --from=build "$CWD/build" .
