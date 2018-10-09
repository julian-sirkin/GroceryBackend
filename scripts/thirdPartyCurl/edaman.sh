#!/bin/sh

API="https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408&app_id=8a2e6840&app_key=0dd73c7a741de20d66c37eeda7f678cc"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \

echo
