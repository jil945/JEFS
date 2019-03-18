import axios from "axios";
import { Constants } from "expo";

const UID = encodeURIComponent(Constants.deviceId);
// const UID = "kekes";
const HOSTNAME = "phi.ics.uci.edu"; // "192.168.1.129";
const BASE_URL =  `http://${HOSTNAME}:8000/user/${UID}/`;

const RECIPE_KEY = "229abf5047msh0496afd1b8be392p17c215jsn41d9d4524130";
const httpRecipe = axios.create({
    baseURL: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/",
    headers: {
        "X-RapidAPI-Key": RECIPE_KEY
    }
});
const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const http  = axios.create({
    baseURL: BASE_URL
});
export { BASE_URL, httpRecipe, WEEKDAYS };
export default http;