import { AsyncStorage } from "react-native";
import DB, { queryStorage, updateStorage } from "./db";
import http, { httpRecipe, WEEKDAYS } from "./http";
import moment from "moment";

const recipeKey = (id) => `recipe-${id}`;
const likeKey = "liked-recipes";
const consumeKey = (date) => {
    let y = date.getFullYear();
    let m = date.getMonth() + 1; // Month is off by 1
    let d = date.getDate();
    return `${y}-${m}-${d}`;
};

const RecipeInfo = {
    _cache: {},
    _likes: {},

    hasCache(id) {
        return this._cache.hasOwnProperty(id);
    },
    getCache(id) {
        return this._cache[id];
    },

    async fetchRecipe(id) {
        if (this.hasCache(id)) {
            return this.getCache(id);
        }

        let key = recipeKey(id);
        let recipe = await queryStorage(key);
        if (recipe.id === id) {
            this._cache[id] = recipe;
            return this._cache[id];
        }

        try {
            let resp = await httpRecipe.get(`recipes/${id}/information`, {
                params: {
                    includeNutrition: true
                }
            });

            // store in cache
            await updateStorage(key, resp.data);
            this._cache[id] = resp.data;
            return this._cache[id];
        } catch(e){}
        return null;
    },

    async initFillLikes() {
        try {
            this._likes = await queryStorage(likeKey);
        } catch(e) {}
    },

    async likeRecipe(id) {
        try {
            await http.post(`recipe/${id}/like`).catch();

            this._likes[id] = new Date();
            await updateStorage(likeKey, this._likes);
        } catch(e) {
            return false;
        }
        return true;
    },

    async consumeRecipe(id) {
        let keyDate = new Date();
        try {
            await this.likeRecipe(id);

            let recipe = await this.fetchRecipe(id);
            let today = await DB.query(keyDate);

            let fields = new Set(["calories", "fat", "carbohydrates", "protein"]);

            
            recipe.nutrition.nutrients.forEach(nutrient => {
                let { title, amount } = nutrient;
                title = title.toLowerCase().replace(/\ /gi, "-");

                if (fields.has(title)) {
                    if (Number.isNaN(today[title]) || !today[title]) {
                        today[title] = 0;
                    }
    
                    today[title] += Number.isNaN(amount) ? 0 : amount;
                }

            });

            await DB.insert(keyDate, today);
        } catch(e) {
            console.log(e);
        }
    },

    async queryConsumed(currDate) {
        let to = new moment(currDate);
        let from  = new moment(currDate);
        from = from.subtract(7, "days");

        let res = [];
        while (from.isSameOrBefore(to)) {
            let frDate = from.toDate();
            let cacheKey = consumeKey(frDate);

            if (!this._cache.hasOwnProperty(cacheKey)) {
                let { calories, fat, carbohydrates, protein } = await this.getConsumed(frDate);
    
                let total = fat + carbohydrates + protein;
                total = !total ? 1 : total;

                this._cache[cacheKey] = {
                    day: frDate,
                    calories,
                    fat: (fat / total) * 100,
                    carbohydrates: (carbohydrates / total) * 100,
                    protein: (protein / total) * 100,
                };
            }
            res.push(this._cache[cacheKey]);
            from.add(1, "days");
        }
        return res;
    },

    async getConsumed(currDate) {
        let res = {};
        const keys = ["calories", "fat", "carbohydrates", "protein"];
        try {
            let today = await DB.query(currDate);

            keys.forEach(k => {
                if (Number.isNaN(today[k]) || !today[k]) {
                    res[k] = 0;
                } else {
                    res[k] = today[k];
                }
            });
        } catch(e) {
            console.log(e);
        }
        return res;
    },

    async getRecommendation() {
        const dbKey = "recRecipe";
        let today = new Date();
        try {
            let recRecipes = await DB.query(today, dbKey);

            if (!recRecipes) {
                let resp = await http.get("recommendations/recipes");
                console.log(resp.data.result);

                let sunday = new Date();
                sunday.setDate(today.getDate() - today.getDay());

                await Promise.all(WEEKDAYS.map((week, i) => {
                    let d = new Date(sunday);
                    d.setDate(d.getDate() + i);

                    let obj = {};
                    obj[dbKey] = resp.data.result[week];
                    return DB.insert(d, obj);
                }));

                recRecipes = await DB.query(today, dbKey);
            }

            return recRecipes;
        } catch(e) {}

        return [];
    }
};

export default RecipeInfo;