
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
  let edamanUrl = `https://api.edamam.com/search?&app_id=${edamanId}&app_key=${edamanKey}&r=`

  // Add all Recipe ids to the request
  for (let key in recipeId) {
    edamanUrl += recipeId[key] + '&'
  }
  // Remove the last & Symbol
  edamanUrl = edamanUrl.substring(0, edamanUrl.length - 1)
  console.log(edamanUrl)

  // Call to
  // axios.get(edamanUrl + searchParam)
  //   .then(function (response) {
  //     const recipes = response.data.hits
  //     return res.status(200).json({ body: recipes })
  //   })
  return res.status(200).json({ body: 'recipes' })
})

module.exports = router
