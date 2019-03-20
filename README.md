# JEFS (Just Enjoy our Food Suggestions)
Final Project for CS 225\
Requirements:
 - Node 8+

## Setup
Use npm to install the Expo CLI command line utility:
```
npm install -g expo-cli
```
After you have clone the repo to your machine, run the following:
```
cd JEFS
npm install
npm start #You can also use expo start
```
The Expo DevTools webpage should automatically open. If not, go to http://localhost:19002/. Follow the instructions on the webpage to view the app.

## Running the app locally on your phone
1. Download the 'Expo Client' either on the App Store or Google Play Store.
2. Using the QR code scanner on your phone, scan the QR code in the Expo DevTools webpage. 
This should automatically prompt you to open the Expo Client app (Make sure your phone and computer are on the same LAN and the connection type is set to LAN in Expo DevTools).

## Codebase File Structure
 - [assets](https://github.com/jil945/JEFS/tree/master/assets) folder includes all the images
 - [src](https://github.com/jil945/JEFS/tree/master/src) folder has below files and folders
    - [screens](https://github.com/jil945/JEFS/tree/master/src/screens) folder fo mostly the userInterface of every page as below
        - [day.js](https://github.com/jil945/JEFS/blob/master/src/screens/day.js) which has the interface of logging the state of the user as of today
        - [explore.js](https://github.com/jil945/JEFS/blob/master/src/screens/explore.js) which has the search screen to search for meals
        - [goal.js](https://github.com/jil945/JEFS/blob/master/src/screens/goal.js) for showing/updating the user's weight progress to the goal
        - [index.js](https://github.com/jil945/JEFS/blob/master/src/screens/index.js) has setup of the main screen
        - [login.js](https://github.com/jil945/JEFS/blob/master/src/screens/login.js) for login screen
        - [settings.js](https://github.com/jil945/JEFS/blob/master/src/screens/settings.js) for settings such as logging of
        - [components](https://github.com/jil945/JEFS/tree/master/src/screens/components) folder has the common repeated elements such as the header
    - [util](https://github.com/jil945/JEFS/tree/master/src/util) folder which has the utilities functions as below
        - [auth.js](https://github.com/jil945/JEFS/blob/master/src/util/auth.js) for setting up connection to [Google User Account API](https://developers.google.com/identity/protocols/OAuth2)
        - [db.js](https://github.com/jil945/JEFS/blob/master/src/util/db.js) for any data that needs to be stored per session which doesn't need to be persistent using local storage
        -  [http.js](https://github.com/jil945/JEFS/blob/master/src/util/http.js) for keeping the configuration for http connection to server
        - [recipeInfo.js](https://github.com/jil945/JEFS/blob/master/src/util/recipeInfo.js) for connecting to [Spoonacular API](https://spoonacular.com/) to get meals if user searches for specific meals that are not recommended by server; to speed up the search skipping the server layer since security is not a concern
        - [tasks.js](https://github.com/jil945/JEFS/blob/master/src/util/tasks.js) for general tasks and mostly for connecting to [Pedometer](https://docs.expo.io/versions/latest/sdk/pedometer/) and Location to get the steps
    - [styles](https://github.com/jil945/JEFS/blob/master/src/styles.js) file for keeping the style settings globally for the entire app