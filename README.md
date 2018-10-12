Front end repo: https://github.com/julian-sirkin/groceryFrontEnd
back end repo: https://github.com/julian-sirkin/GroceryBackend
live site: https://julian-sirkin.github.io/groceryFrontEnd/#



Overview:
This is an app that allows a user to look up recipes, then save and remove them from a list.
All calls from this website are to the back end that I created, but then that back end communitcates with the edamam api to get the resipes, and the amazon fresh api for a shopping feature that is not built out yet.
Token authentication is used to verify a user, and maintain their list of prefered recipes.
The back end communitcates with the edamam and amazon fresh Apis. to display informatiom back to the user.
This application uses mongo db to store ids of recipes that the user saves from the edamam api. This allows the user to see any recipe that they may have saved later on.


technologies used:
node, express, mongodb, axios, mongoose, javascript

unsolved problems:
Currently with the call to amazon, I pass in information, however, that information is not reflected in the response. I don't know if this is because I am passing something incorrectly, or if this just happens with this end point. The documentaiton I got emailed is version 1.0, so I am honestly not sure.
I also want to take the ingredients, put them into a standard format and be able to build an organized list of ingredients, so that I can either pass that to an API, or send that back to the user as a grocery list.

planning/problem solving:
I established the general flow of how I wanted information to go. I decided I wanted to ping my server, then from there, make requests to the two servers.
I did this because I wanted to be able to keep the keys for the api off of the clients computer.
I then created a plan, and followed through with it.

1. Create a server where that I can message from a front end, and crud a resource.
2. curl the edamam api to test the connection
3. Build the call into the route
4. Return information from api to user
5. Build a route that allowed a user to save recipe ids
6. Build a route that got the recipe ids, and then sent them to the API, and return the result

I ran into a number of problems, including the fact that I was returning information to a third party api to my user, but without any reference to my own database. As a result, I had to modify the data when it returned, so I could delete it later if neccesary.

Database structure
https://preview.ibb.co/hKAZg9/IMG-0250.jpg
Project structure
https://preview.ibb.co/i7PXZU/IMG-0251.jpg

Routes/Paths:
/recipeRoutes
  All actions requre token generated from login
get:
  Gets user data, then makes a call to a third party api, and returns data from the api, with adding the database id for that item to each one.
post:
  Accepts an object
  "recipe" : {
  recipeId: String
  }

Delete requires an id
/recipes:id
  This will delete the recipe from the databse

edamam_routes
  get:
  pass in object
  recipe: {
  search: string
  }
  This will then be passed into a call to an api, and the results will be returned
