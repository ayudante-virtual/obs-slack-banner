#!/bin/sh

ENV=$(jq -cn env)
ESCAPED_ENV=$(printf '%s\n' "$ENV" | sed -e 's/[\/&]/\\\\\\&/g')
sed -i'' 's~"__ENV__"~'\'"$ESCAPED_ENV"\''~g' index.html
