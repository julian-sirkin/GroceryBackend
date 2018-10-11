
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const router = express.Router()
const handle = require('../../lib/error_handler')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.get('/edaman', (req, res) => {
  // Keys for edaman server
  const edamanId = process.env.EDAMAN_APPLICATION_ID
  const edamanKey = process.env.EDAMAN_APPLICATION_KEY
  // Get the serach parameter from the json sent
  const searchParam = encodeURIComponent(req.query.recipe.search)
  // Edaman url
  const edamanUrl = `https://api.edamam.com/search?&app_id=${edamanId}&app_key=${edamanKey}&q=${searchParam}`

  // Call to
  axios.get(edamanUrl)
    .then(function (response) {
      const recipes = response.data.hits
      return res.status(200).json({ body: recipes })
    })
    .catch('fail')
  // return res.status(200).json({ body: 'recipes' })
})

module.exports = router
