import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "./home";
import LoginScreen from './login';

const MainStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
    },
    Home: {
        screen: HomeScreen
    },
    initialRouteName: "Login"
});

const AppContainer = createAppContainer(MainStack);

export default AppContainer;