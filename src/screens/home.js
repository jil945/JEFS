import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";

export default class HomeScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
                <Button title="Sign Out"
                    onPress={() => this.props.navigation.navigate("Login")}></Button>
            </View>
        );
    }
}