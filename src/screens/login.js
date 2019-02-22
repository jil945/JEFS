import React from "react";
import PropTypes from "prop-types";
import { 
    ActivityIndicator,
    AsyncStorage,
    Button,
    Text, 
    View, 
} from "react-native";
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
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    _signIn = async () => {
        this.setState({loading: true});
        await AsyncStorage.setItem(auth.token, "dummytext");
        this.setState({loading: false});

        this.props.navigation.navigate("Main");
    }
    
    render() {
        return (
            <View style={S.container}>
                <Text>Login Screen</Text>
                {this.state.loading ? (
                    <ActivityIndicator></ActivityIndicator> 
                ) : (
                    <Button title="Login" 
                        onPress={this._signIn}></Button>
                )}
            </View>
        );
    }
}