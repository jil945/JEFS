import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";

export default class Settings extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Settings</Text>
            </View>
        );
    }
}