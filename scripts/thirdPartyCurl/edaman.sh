#!/bin/sh

API="https://api.edamam.com/search"


curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --data '{
    "recipe": {
      "search": "chicken parm"
    }
  }'
echo
