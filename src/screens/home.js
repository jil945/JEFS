import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage, View, Text, Button, Image } from "react-native";

import Auth from "../util/auth";

export default class HomeScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {}
        };
    }

    _signOut = async () => {
        try {
            await Auth.signOut();
            this.props.navigation.navigate("Login");
        } catch(e) {
            console.log(e);
        }
    }

    componentWillMount = async () => {
        let userInfo = await Auth.getUserInfo();
        console.log(userInfo);
        this.setState({ userInfo });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
                <Button title="Sign Out"
                    onPress={this._signOut}></Button>
            </View>
        );
    }
}