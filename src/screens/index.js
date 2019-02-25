import React from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import HomeScreen from "./home";
import LoginScreen from "./login";

const MainStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    initialRouteName: "Home"
});
const LoginStack = createStackNavigator({
    Login: LoginScreen
});

const AppContainer = createAppContainer(createSwitchNavigator(
    { 
        Main: MainStack,
        Login: LoginStack
    }, {
        initialRouteName: "Login"
    }
));

export default AppContainer;