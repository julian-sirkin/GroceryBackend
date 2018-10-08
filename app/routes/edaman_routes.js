
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const router = express.Router()
// Keys for edaman server
const edamanId = process.env.EDAMAN_APPLICATION_ID
const edamanKey = process.env.EDAMAN_APPLICATION_KEY
// Edaman url
const edamanUrl = `https://api.edamam.com/search?&app_id=${edamanId}&app_key=${edamanKey}&q=chicken+parm`

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



router.get('/edaman', (req, res) => {
  console.log(req.body)
  axios.get(edamanUrl)
    .then(function (response) {
      const recipes = response.data.hits
      return res.status(200).json({ body: recipes })
    })
})

module.exports = router
