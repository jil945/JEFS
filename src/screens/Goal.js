import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";

export default class Goal extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Goal</Text>
            </View>
        );
    }
}