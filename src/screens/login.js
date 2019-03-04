import React from "react";
import PropTypes from "prop-types";
import { 
    ActivityIndicator,
    View,
} from "react-native";

import Auth from "../util/auth";
import _s from "../styles";
import { Tasks } from "../util/tasks";
import GoogleSignInButton from "./components/GoogleSignInButton";

export default class Login extends React.Component {
    static navigationOptions = {
        title: "Please sign in",
    };
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    _signIn = async () => {
        try {
            this.setState({ loading: true });
            await Auth.signIn();
            this.setState({ loading: false });

            this._mainPage();
        } catch (error) {
            console.log(error);
        }
    }

    _mainPage = async () => {
        await Tasks.init();
        this.props.navigation.navigate("Main");
    }

    componentWillMount = async () => {
        try {
            if (await Auth.trySigningIn()) {
                this._mainPage();
            }
        } catch(e){}
    }
    
    render() {
        return (
            <View style={_s.container}>
                { this.state.loading ? (
                    <ActivityIndicator></ActivityIndicator>
                ) : (
                    <GoogleSignInButton onPress={this._signIn} disabled={this.state.loading}></GoogleSignInButton>
                )}
                
            </View>
        );
    }
}