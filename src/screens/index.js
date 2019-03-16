import React from "react";
import { 
    createAppContainer, 
    createBottomTabNavigator,
    createStackNavigator, 
    createSwitchNavigator 
} from "react-navigation";

import Day from "./day";
import Explore from "./explore";
import Goal from "./goal";
import Settings from "./settings";

import Login from "./login";

import Profile from "./profile";
import Meal from "./meal";

const MainStack = createBottomTabNavigator({
    Day: Day,
    Explore: Explore,
    Goal: Goal,
    Settings: Settings,
});

const LoginStack = createStackNavigator({
    Login: Login
});

const ProfileStack = createStackNavigator({
    Profile: Profile
});
const MealStack = createStackNavigator({
    Meal: Meal
});
const AppContainer = createAppContainer(createSwitchNavigator(
    { 
        Main: MainStack,
        Profile: ProfileStack,
        Meal: MealStack,
        Login: LoginStack
    }, {
        initialRouteName: "Login"
    }
));

export default AppContainer;