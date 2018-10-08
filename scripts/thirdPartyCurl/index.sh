#!/bin/sh

API="http://localhost:4741"
URL_PATH="/edaman"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --data '{
    "recipe": {
      "ingredient": "chicken"
    }
  }'
echo
