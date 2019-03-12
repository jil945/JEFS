import React from "react";
import { AsyncStorage } from "react-native";
import { AppAuth } from "expo-app-auth";
import axios from "axios";

import http from "./http";

const GOOGLE_AUTH_STATE = "@JEFS:GoogleOathKey";
const USER_PROFILE_KEY = "@JEFS:UserProfileKey";

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
            await AsyncStorage.removeItem(GOOGLE_AUTH_STATE);
        } catch(e){
            console.log(e);
        }
    },

    async setAuthState(authState) {
        try {
            await AsyncStorage.setItem(GOOGLE_AUTH_STATE, JSON.stringify(authState));
        } catch(e) {
            console.log(e);
        }
    },

    async getAuthState() {
        try {
            let auth = JSON.parse(await AsyncStorage.getItem(GOOGLE_AUTH_STATE));
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
            console.log("Error", e);
        }
        return false;
    },

    async getUserProfileAsync() {
        let data = {};
        try {
            let userToken = await this.getUserToken();
            let googleResp = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${userToken}`}
            });
            data = googleResp.data;

            let userProfile = await http.get("")
                .catch(e => null);
            
            if (userProfile) {
                Object.keys(userProfile.data).reduce((a, c) => {
                    a[c] = userProfile.data[c];
                    return a;
                }, data);
            }
        } catch(e) {
            console.log(e);
        }
        await this.setUserProfileStorage(data);
        return data;
    },

    async checkProfileExistsAsync() {
        try {
            let resp = await http.get("");
            return resp.status === 200;
        } catch(e) {
            console.log(e);
        }
        return false;
    },

    async createUserProfileAsync(profile) {
        let resp;
        try {
            resp = await http.post("", profile);

            let oldProfile = await this.getUserProfileStorage();
            if (oldProfile) {
                Object.keys(profile).forEach(k => {
                    oldProfile[k] = profile[k];
                });
                await this.setUserProfileStorage(oldProfile);
            } else {
                await this.setUserProfileStorage(profile);
            }
        } catch(e) {
            resp = e;
        }
        return resp;
    },

    async updateUserProfileAsync(profile) {
        let resp;
        try {
            resp = await http.put("", profile);

            let oldProfile = await this.getUserProfileStorage();
            if (oldProfile) {
                Object.keys(profile).forEach(k => {
                    oldProfile[k] = profile[k];
                });
                await this.setUserProfileStorage(oldProfile);
            } else {
                await this.setUserProfileStorage(profile);
            }
        } catch(e) {
            resp = e;
        }
        return resp;
    },

    async setUserProfileStorage(profile) {
        try {
            await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
        } catch(e) {}
    },

    async getUserProfileStorage() {
        try {
            return JSON.parse(await AsyncStorage.getItem(USER_PROFILE_KEY));
        } catch(e){}
        return null;
    },
};

export default Auth;