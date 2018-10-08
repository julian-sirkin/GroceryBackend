#!/bin/sh

API="http://localhost:4741"
URL_PATH="/edamanID"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --data '{
    "recipe": {
      "recipeId" : {
        "1": "http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408",
        "2": "http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_6b71506eaed4102c0b97dce1eaddd9a6"
      }
    }
  }'
echo
