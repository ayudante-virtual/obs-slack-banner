FROM node:14.16.0-alpine3.13 as base

# Don't hardcode CWD
ARG CWD=/app

# Set workdir
WORKDIR "$CWD"

# Create non-root user
ENV USER=docker
ENV UID=12345
ENV GID=23456

RUN addgroup \
    --gid "$GID" \
    --system \
    "$USER" && \

    adduser \
    --disabled-password \
    --gecos "" \
    --home "$(pwd)" \
    --ingroup "$USER" \
    --no-create-home \
    --uid "$UID" \
    "$USER" && \

    chown "$USER" .

# Set non-root user
USER "$USER"

# ----------------------------------
# production_dependencies
# ----------------------------------
FROM base as production_dependencies

COPY package.json package-lock.json ./

RUN npm install --only=production

# ----------------------------------
# production_files
# ----------------------------------
FROM base as production_files

COPY src src

# ----------------------------------
# production
# ----------------------------------
FROM base as production

# Get CWD
ARG CWD=/app

# Copy the previously installed dependencies
COPY --from=production_dependencies "$CWD" .

# Copy over rest of the code that will be part of the docker image
COPY --from=production_files "$CWD" .

CMD ["npm", "start"]
