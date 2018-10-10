'use strict'
const express = require('express')
const axios = require('axios')

const handle = require('../../lib/error_handler')

const router = express.Router()


router.post('/amazonshopping', (req, res) => {
  const amazonUrl = 'http://www.amazon.com/afx/ingredients/landing'
  const data = req.body
  axios.post(amazonUrl, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'localhost:4741',
      'Referer': 'localhost:4741/#'
    }
  }
  )
    .then(response => {
      console.log('got to .then')
      return res.status(200).json({ body: response.data })
    })
    .catch(err => handle(err, res))
})

module.exports = router
