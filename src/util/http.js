import axios from "axios";
import { Constants } from "expo";

const UID = encodeURIComponent(Constants.deviceId);
// const UID = "kekes";
const HOSTNAME = "phi.ics.uci.edu"; // "192.168.1.129";
const BASE_URL =  `http://${HOSTNAME}:8000/user/${UID}/`;

// PLACEHOLDER results
const MEAL = {
    "glutenFree" : false,
    "ingredients" : [
        "arugula",
        "baguette",
        "basil",
        "butter",
        "canned tomatoes",
        "crushed red pepper",
        "eggs",
        "garlic cloves",
        "olive oil",
        "onion",
        "parmesan cheese",
        "parmesan cheese",
        "rosemary",
        "salt and pepper",
        "salt and pepper",
        "thyme"
    ],
    "id" : 640636,
    "title" : "Creamy Egg Marinara Breakfast Dip",
    "cuisines" : [],
    "vegan" : false,
    "image" : "https://spoonacular.com/recipeImages/640636-556x370.jpg",
    "vegetarian" : false
};
const WEEKDAYS = ["mondy", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const _GET_RECIPIE = WEEKDAYS.reduce((a, w) => {
    a[w] = {
        "breakfast": MEAL,
        "lunch": MEAL,
        "dinner": MEAL,
    };
    return a;
}, {});
const GET_RECIPIE = Promise.resolve(_GET_RECIPIE);
const WORKOUT = {
    name: "Bench Press",
    description: "A bench press",
    picture: "https://weighttraining.guide/wp-content/uploads/2016/10/Incline-Reverse-Grip-Barbell-Bench-Press.jpg"
};
const _GET_WORKOUT = WEEKDAYS.reduce((a, w) => {
    a[w] = [WORKOUT];
    return a;
}, {});
const GET_WORKOUT = Promise.resolve(_GET_WORKOUT);

const http  = axios.create({
    baseURL: BASE_URL
});
export { BASE_URL, GET_WORKOUT, GET_RECIPIE };
export default http;