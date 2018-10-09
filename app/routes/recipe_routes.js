// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for recipes
const Recipe = require('../models/recipe')

// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// Require dotenv to get keys for API
const dotenv = require('dotenv')
dotenv.config()
const edamanId = process.env.EDAMAN_APPLICATION_ID
const edamanKey = process.env.EDAMAN_APPLICATION_KEY
const axios = require('axios')


// INDEX
// GET /recipes
router.get('/recipes', requireToken, (req, res) => {
  Recipe.find()
    .then(recipes => {
      // `recipes` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      const savedRecipes = recipes.map(recipe => recipe.toObject())
      // Create an emptry array to push to
      const userRecipes = []
      savedRecipes.forEach(recipe => {
        // Compares owner id to user id
        if (recipe.owner == req.user.id) {
          userRecipes.push(recipe)
        }
      })
      // UserRecipes is now an array filled with objects
      // That have a key of .recipeId that I can then use to call the third party api
      //Base URL to send to
      let edamanUrl = `https://api.edamam.com/search?&app_id=${edamanId}&app_key=${edamanKey}`
      // Add all IDs of recipes to URL
      for (var i = 0; i < userRecipes.length; i++) {
        // The enculdeURIComponent is there because each Id is a url
        // Without encoding it, this call fails
        edamanUrl += '&r=' + encodeURIComponent(userRecipes[i].recipeId)
      }
      return edamanUrl
    })
    .then(edamanUrl => {
      console.log(edamanUrl, 'url for call')
      // Get call to third party Api
      axios.get(edamanUrl)
        .then(function (response) {
          const recipes = response.data
          return res.status(200).json({ body: recipes })
        })
        .catch(err => handle(err, res))
    })
    .catch(err => handle(err, res))
})

// SHOW
// GET /recipes/5a7db6c74d55bc51bdf39793
router.get('/recipes/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Recipe.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "recipe" JSON
    .then(recipe => res.status(200).json({ recipe: recipe.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// CREATE
// POST /recipes
router.post('/recipes', requireToken, (req, res) => {
  // set owner of new recipe to be current user
  req.body.recipe.owner = req.user.id
  Recipe.create(req.body.recipe)
    // respond to succesful `create` with status 201 and JSON of new "recipe"
    .then(recipe => {
      res.status(201).json({ recipe: recipe.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(err => handle(err, res))
})

// UPDATE
// PATCH /recipes/5a7db6c74d55bc51bdf39793
router.patch('/recipes/:id', requireToken, (req, res) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.recipe.owner

  Recipe.findById(req.params.id)
    .then(handle404)
    .then(recipe => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, recipe)

      // the client will often send empty strings for parameters that it does
      // not want to update. We delete any key/value pair where the value is
      // an empty string before updating
      Object.keys(req.body.recipe).forEach(key => {
        if (req.body.recipe[key] === '') {
          delete req.body.recipe[key]
        }
      })

      // pass the result of Mongoose's `.update` to the next `.then`
      return recipe.update(req.body.recipe)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// DESTROY
// DELETE /recipes/5a7db6c74d55bc51bdf39793
router.delete('/recipes/:id', requireToken, (req, res) => {
  Recipe.findById(req.params.id)
    .then(handle404)
    .then(recipe => {
      // throw an error if current user doesn't own `recipe`
      requireOwnership(req, recipe)
      // delete the recipe ONLY IF the above didn't throw
      recipe.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

module.exports = router
