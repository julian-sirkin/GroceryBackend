Front end repo: https://github.com/julian-sirkin/groceryFrontEnd
back end repo: https://github.com/julian-sirkin/GroceryBackend
live site: https://julian-sirkin.github.io/groceryFrontEnd/#


Overview:
Overview:
This is an app that allows a user to look up recipes, then save and remove them from a list.
All calls from this website are to the back end that I created, but then that back end communitcates with the edamam api to get the resipes, and the amazon fresh api for a shopping feature that is not built out yet.
Token authentication is used to verify a user, and maintain their list of prefered recipes.
The back end communitcates with the edamam and amazon fresh Apis. to display informatiom back to the user.
This application uses mongo db to store ids of recipes that the user saves from the edamam api. This allows the user to see any recipe that they may have saved later on.
