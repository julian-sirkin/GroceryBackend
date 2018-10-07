
const express = require('express')

const router = express.Router()


router.get('/edaman', (req, res) => {
  console.log('I have been hit', req.body)
  res.status(200).json({ body: req.body })
})

module.exports = router
