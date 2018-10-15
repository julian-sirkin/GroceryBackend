
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const router = express.Router()


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


router.get('/edamanID', (req, res) => {
  // Keys for edaman server
  const edamanId = process.env.EDAMAN_APPLICATION_ID
  const edamanKey = process.env.EDAMAN_APPLICATION_KEY

  // Get the serach parameter from the json sent
  const recipeId = req.body.recipe.recipeId

  // Edaman url
  let edamanUrl = `https://api.edamam.com/search?&app_id=${edamanId}&app_key=${edamanKey}`

  // Add all Recipe ids to the request
  for (let key in recipeId) {
    edamanUrl += '&r=' + recipeId[key]
  }
  // Remove the last & Symbol

  // Call to
  axios.get(edamanUrl)
    .then(function (response) {
      const recipes = response.data
      return res.status(200).json({ body: recipes })
    })

})

module.exports = router
