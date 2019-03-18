import { AsyncStorage } from "react-native";
import DB, { queryStorage, updateStorage } from "./db";
import http, { httpRecipe, WEEKDAYS } from "./http";

const recipeKey = (id) => `recipe-${id}`;
const likeKey = "liked-recipes";

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
        this._likes[id] = new Date();

        try {
            await Promise.all([
                updateStorage(likeKey, this._likes),
                http.post(`recipe/${id}/like`)
                    .catch(console.log)
            ]);
        } catch(e) {}
    },

    async consumeRecipe(id) {
        let today = new Date();
        try {
            await this.likeRecipe(id);

            let recipe = await this.fetchRecipe(id);
            let nutrients = await DB.query(today, "nutrients"); // DO NOT changet this variable name

            if (!nutrients || !Array.isArray(nutrients)) {
                nutrients = recipe.nutrition.nutrients;
            } else {
                recipe.nutrition.nutrients.forEach(n => {
                    let idx = nutrients.find(x => x.title === n.title);

                    if (idx === -1) {
                        nutrients.push(n);
                    } else {
                        nutrients[idx]["amount"] += n["amount"]; // TODO
                        nutrients[idx]["percentOfDailyNeeds"] += n["percentOfDailyNeeds"];
                    }
                });
            }
            await DB.insert(today, { nutrients });


            let caloricBreakdown = await DB.query(today, "caloricBreakdown"); // DO NOT changet this variable name
            let tempCalBreakdown = {};
            let breakdown = recipe.nutrition.caloricBreakdown;
            let cal = recipe.nutrition.nutrients.find(x => x.title.toLowerCase() === "calories");
            let calAmt = cal.amount;

            tempCalBreakdown["protein"] = ( breakdown["percentProtein"] / 100 ) * calAmt;
            tempCalBreakdown["fat"]     = ( breakdown["percentFat"] / 100 ) * calAmt;
            tempCalBreakdown["carbs"]   = ( breakdown["percentCarbs"] / 100 ) * calAmt;

            if (!caloricBreakdown) {
                caloricBreakdown = tempCalBreakdown;
            } else {
                caloricBreakdown["protein"] += tempCalBreakdown["protein"];
                caloricBreakdown["fat"]     += tempCalBreakdown["fat"];
                caloricBreakdown["carbs"]   += tempCalBreakdown["carbs"];
            }

            await DB.insert(today, { caloricBreakdown });


        } catch(e) {
            console.log(e);
        }
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