import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";

import Auth from "../util/auth";

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        };
    }

    _signOut = async () => {
        await Auth.signOut();
        this.props.navigation.navigate("Login");
    }

    componentWillMount = async () => {
        try {
            let userInfo = await Auth.getUserInfo();
            this.setState({ userInfo });
            console.log(userInfo);
        } catch(e) {
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Settings</Text>
                <Button title="Log Out"
                    onPress={this._signOut}></Button>
            </View>
        );
    }
}