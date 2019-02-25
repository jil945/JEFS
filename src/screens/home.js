import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";
import {createBottomTabNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Day from './Day'
import Explore from './Explore'
import Week from './Week'
import Goal from './Goal'
import Settings from './Settings'
class HomeScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Button title="Sign Out"
                    onPress={() => this.props.navigation.navigate("Login")}></Button>
            </View>
        );
    }
}

export default createBottomTabNavigator({
Day: {
	screen:Day,
	navigationOptions:{
	tabBarLabel:"Day",
	tabBarIcon:({tintColor})=>(
	<Icon name="ios-today" color={tintColor} size={24} />
	)
	}
},
Explore: {
	screen:Explore,
		navigationOptions:{
	tabBarLabel:"Explore",
	tabBarIcon:({tintColor})=>(
	<Icon name="ios-search" color={tintColor} size={24} />
	)
	}
},
Week: {
	screen:Week,
		navigationOptions:{
	tabBarLabel:"Week",
	tabBarIcon:({tintColor})=>(
	<Icon name="ios-calendar" color={tintColor} size={24} />
	)
	}
},
Goal: {
	screen:Goal,
		navigationOptions:{
	tabBarLabel:"Goal",
	tabBarIcon:({tintColor})=>(
	<Icon name="ios-contact" color={tintColor} size={24} />
	)
	}
},
Settings: {
	screen:Settings,
		navigationOptions:{
	tabBarLabel:"Settings",
	tabBarIcon:({tintColor})=>(
	<Icon name="ios-settings" color={tintColor} size={24} />
	)
	}
}
});