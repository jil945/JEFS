import React from "react";
import PropTypes from "prop-types";
import { 
    AsyncStorage, 
    Button,
    SafeAreaView, 
    Text, 
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Auth from "../util/auth";
import S from "../styles";

export default class Settings extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-settings" color={tintColor} size={24}></Icon>
        )
    };
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        };
    }

    _signOut = async () => {
        await Auth.signOut();
        this._loginPage();
    }

    _clearCache = async () => {
        await AsyncStorage.clear();
        await this._signOut();
    }

    _loginPage = () => {
        this.props.navigation.navigate("Login");
    }

    componentWillMount = async () => {
        try {
            let userInfo = await Auth.getUserInfo();
            this.setState({ userInfo });
            console.log(userInfo);
        } catch(e) {}
    }

    render() {
        return (
            <SafeAreaView style={S.container}>
                <Text>Settings</Text>
                <Button title="Log Out"
                    onPress={this._signOut}></Button>
                <Button title="Clear cache"
                    onPress={this._clearCache}></Button>
            </SafeAreaView>
        );
    }
}