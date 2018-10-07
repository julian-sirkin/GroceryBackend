#!/bin/bash

API="http://localhost:4741"
URL_PATH="/recipes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "recipe": {
      "recipe": "'"${RECIPE}"'",
      "dietaryRestriction": "'"${DT}"'"
    }
  }'

echo
