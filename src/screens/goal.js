import React from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import _s from "../styles";

export default class Goal extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-contact" color={tintColor} size={24}></Icon>
        )
    };
    render() {
        return (
            <SafeAreaView style={_s.container}>
                <Text>Goal</Text>
            </SafeAreaView>
        );
    }
}