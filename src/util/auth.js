import React from "react";
import { AsyncStorage } from "react-native";
import { Google } from "expo";
import axios from "axios";

const CLIENT_ID = "870708112215-nca7kn7j3bk6036dlf4225l69eil12iv.apps.googleusercontent.com";
const GoogleAccessToken = "@JEFS:GoogleAccesstoken";

const Auth = {
    // Don't use this
    async isSignedIn() {
        let tok = await AsyncStorage.getItem(GoogleAccessToken);
        if (!tok || tok.length == 0) {
            return false;
        }
        
        return true;
    },

    async signIn() {
        try {
            let resp = await Google.logInAsync({
                clientId: CLIENT_ID,
                scopes: ["openid", "profile"]
            });
            if (resp.type !== "success") {
                throw new Error("Login Cancelled");
            }

            await AsyncStorage.setItem(GoogleAccessToken, resp.accessToken);
            return resp;

        } catch(e) {
            throw e;
        }
    },

    async signOut() {
        try {
            await AsyncStorage.removeItem(GoogleAccessToken);
        } catch(e){}
    },

    async getUserToken() {
        try {
            return await AsyncStorage.getItem(GoogleAccessToken);
        } catch(e) {
            return "";
        }
    },

    async getUserInfo(userToken) {
        let data;
        try {
            if (!userToken) {
                userToken = await this.getUserToken();
            }            
            let resp = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${userToken}`}
            });

            data = resp.data;
        } catch(e) {
            data = e.response.data;
        }
        return data;
    },

    async trySigningIn() {
        try {
            let userToken = await this.getUserToken();

            if (userToken && userToken.length > 0) {
                let userInfo = await this.getUserInfo(userToken);

                if (userInfo.error) {
                    return false;
                }
                return true;
            }
        } catch(e) {
            console.log(e);
        }
        return false;
    }
};

export default Auth;