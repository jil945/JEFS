import React from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import S from "../styles";

export default class Week extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-calendar" color={tintColor} size={24}></Icon>
        )
    };

    render() {
        return (
            <SafeAreaView style={S.container}>
                <Text>Week</Text>
            </SafeAreaView>
        );
    }
}