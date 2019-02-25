import React from "react";
import PropTypes from "prop-types";
import { 
    ActivityIndicator,
    AsyncStorage,
    Button,
    Text, 
    View, 
} from "react-native";

import { Google } from "expo";

import { auth } from "../constants";
import S from "../styles";

export default class LoginScreen extends React.Component {
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
        /* this.setState({loading: true});
        await AsyncStorage.setItem(auth.token, "dummytext");
        this.setState({loading: false}); */

        try {
            let user = await Google.logInAsync({
                clientId: auth.clientId,
                scopes: ["openid", "profile"],
            });
            console.log(user);
        } catch (error) {
            console.log(error);
        }
        
        this.props.navigation.navigate("Main");
    }
    
    render() {
        return (
            <View style={S.container}>
                <Text>Login Screen (Testing)</Text>
                <Button title="Google"
                    onPress={this._signIn}></Button>
            </View>
        );
    }
}