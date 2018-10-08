#!/bin/sh

API="http://www.amazon.com/afx/ingredients/landing"
URL_PATH=

curl "${API}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
  "ingredients": [
    {
      "name": "Oranges",
      "quantityList": [
        {
          "unit": "COUNT",
          "amount": 5
        },
        {
          "unit": "KILOGRAMS",
          "amount": 0.5
        }
      ]
    },
    {
      "name": "Greek Yogurt",
      "brand": "chobani",
      "quantityList": [
        {
          "unit": "OUNCES",
          "amount": 5
        }
      ]
    }
  ]
}'
echo
