#!/bin/sh

ENV=$(jq -cn env)
sed -i'' 's~"__ENV__"~'\'"$ENV"\''~g' index.html
