import { AsyncStorage } from "react-native";

const storageKey = (key) => `@JEFS:LocalStorage${key}`;

async function queryStorage(key) {
    let obj = {};

    try {
        let k = storageKey(key);
        let objStr = await AsyncStorage.getItem(k);
        obj = JSON.parse(objStr);
        if (!obj) {
            obj = {};
        }
    } catch(e) {}

    return obj;
}

async function updateStorage(date, obj) {
    let origObj = {};
    try {
        origObj = await queryStorage(date);

        // update orig object with new keys
        Object.keys(obj).forEach(k => {
            console.log(date, k, obj[k]);
            origObj[k] = obj[k];
        });

        // put object back in db
        let key = storageKey(date);
        let objStr = JSON.stringify(origObj);
        await AsyncStorage.setItem(key, objStr);

    } catch(e) {}
    return origObj;
}


const DB = {
    _cache: {},

    convertToDateKey(date) {
        let key = date;
        if (date instanceof Date) {
            let y = date.getFullYear();
            let m = date.getMonth() + 1; // Month is off by 1
            let d = date.getDate();
            key = `${y}-${m}-${d}`;
        } else if (typeof date !== "string") {
            key = JSON.stringify(date);
        }
        return key;
    },

    /**
     * 
     * @param {string|Date} date 
     * @param {string=} key
     */
    async query(date, key) {
        let dbKey = this.convertToDateKey(date);

        if (!this._cache.hasOwnProperty(dbKey)) {
            this._cache[dbKey] = await queryStorage(dbKey);
        }

        if (key === undefined) {
            return this._cache[dbKey];
        } else {
            return this._cache[dbKey][key];
        }
    },

    /**
     * 
     * @param {string|Date} date 
     * @param {object} obj 
     */
    async insert(date, obj) {
        let dbKey = this.convertToDateKey(date);

        let newObj = await updateStorage(dbKey, obj);
        this._cache[dbKey] = newObj;
    }
};

export { queryStorage, updateStorage };
export default DB;