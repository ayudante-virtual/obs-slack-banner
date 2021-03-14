#!/bin/bash
docker build "$SRC_PATH" -t "$IMAGE_NAME:latest" --target=production
docker tag "$IMAGE_NAME:latest" "$IMAGE_NAME:$VERSION"
echo "$REGISTRY_PASSWORD" | docker login $REGISTRY_URL -u $REGISTRY_USERNAME --password-stdin
docker push $IMAGE_NAME:$IMAGE_VERSION
docker push $IMAGE_NAME:latest
