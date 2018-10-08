#!/bin/sh

API="http://www.amazon.com/afx/ingredients/verify"
URL_PATH=

curl "${API}" \
  --include \
  --request POST \
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
