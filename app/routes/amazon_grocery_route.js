'use strict'
const express = require('express')
const axios = require('axios')

const handle = require('../../lib/error_handler')

const router = express.Router()


router.post('/amazonshopping', (req, res) => {
  const amazonUrl = 'http://www.amazon.com/afx/ingredients/landing'
  // Grab information to send to amazon from incomming post request
  const data = req.body
  console.log('information passing into axios', data)
  axios.post(amazonUrl, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://julian-sirkin.github.io/groceryFrontEnd/',
      'Referer': 'https://julian-sirkin.github.io/groceryFrontEnd/'
    }
  }
  )
    .then(response => {
      return res.status(200).json({ body: response.data })
    })
    .catch(err => handle(err, res))
})

module.exports = router
