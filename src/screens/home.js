import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Day from "./day";
import Explore from "./explore";
import Week from "./week";
import Goal from "./goal";
import Settings from "./settings";

export default createBottomTabNavigator({
    Day: {
        screen: Day,
        navigationOptions:{
            tabBarLabel:"Day",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-today" color={tintColor} size={24} />
            )
        },
    },
    Explore: {
        screen: Explore,
        navigationOptions: {
            tabBarLabel: "Explore",
            tabBarIcon: ({ tintColor}) => (
                <Icon name="ios-search" color={tintColor} size={24} />
            )
        }
    },
    Week: {
        screen: Week,
        navigationOptions: {
            tabBarLabel: "Week",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-calendar" color={tintColor} size={24} />
            )
        }
    },
    Goal: {
        screen: Goal,
        navigationOptions:{
            tabBarLabel: "Goal",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-contact" color={tintColor} size={24} />
            )
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarLabel:"Settings",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-settings" color={tintColor} size={24} />
            )
        }
    }
});
