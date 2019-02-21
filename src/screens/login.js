import React from "react";
import { View, Text, Button } from "react-native";

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Login Screen</Text>
                <Button title="Login"
                        onPress={() => this.props.navigation.navigate("Home")}></Button>
            </View>
        );
    }
}