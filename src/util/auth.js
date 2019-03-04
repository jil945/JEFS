import React from "react";
import { AsyncStorage } from "react-native";
import { AppAuth } from "expo-app-auth";
import axios from "axios";

const GoogleAuthState = "@JEFS:GoogleOathKey";

const GOOGLE_CONFIG = {
    issuer: "https://accounts.google.com",
    scopes: ["openid", "profile"],
    clientId: "870708112215-nca7kn7j3bk6036dlf4225l69eil12iv.apps.googleusercontent.com",
};

const Auth = {
    async signIn() {
        try {
            let resp = await AppAuth.authAsync(GOOGLE_CONFIG);

            await this.setAuthState(resp);
            return resp;

        } catch(e) {
            console.log(e);
        }
    },

    async signOut() {
        try {
            let accessToken = await this.getUserToken();
            await AppAuth.revokeAsync(GOOGLE_CONFIG, {
                token: accessToken,
                isClientIdProvided: true,
            });
            await AsyncStorage.removeItem(GoogleAuthState);
        } catch(e){
            console.log(e);
        }
    },

    async setAuthState(authState) {
        try {
            await AsyncStorage.setItem(GoogleAuthState, JSON.stringify(authState));
        } catch(e) {
            console.log(e);
        }
    },

    async getAuthState() {
        try {
            let auth = JSON.parse(await AsyncStorage.getItem(GoogleAuthState));
            if (auth && this.isExpired(auth)) {
                auth = await AppAuth.refreshAsync(GOOGLE_CONFIG, auth.refreshToken);
                await this.setAuthState(auth);
            }
            return auth;
        } catch(e) {
            console.log(e);
        }
        return null;
    },

    isExpired({ accessTokenExpirationDate }) {
        return new Date(accessTokenExpirationDate) < new Date();
    },

    async getUserToken() {
        try {
            let auth = await this.getAuthState();
            if (auth) {
                return auth.accessToken;
            }
        } catch(e) {
            console.log(e);
        }
        return "";
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
            console.log(e);
            data = e.response.data;
        }
        return data;
    },

    async trySigningIn() {
        try {
            let auth = await this.getAuthState();
            // console.log(auth);
            return !!auth;
        } catch(e) {
            console.log(e);
        }
        return false;
    }
};

export default Auth;