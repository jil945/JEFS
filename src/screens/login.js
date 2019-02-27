import React from "react";
import PropTypes from "prop-types";
import { 
    Button,
    Text, 
    View, 
} from "react-native";

import Auth from "../util/auth";
import S from "../styles";

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

    _mainPage = () => {
        this.props.navigation.navigate("Main");
    }

    componentWillMount = async () => {
        if (await Auth.trySigningIn()) {
            this._mainPage();
        }
    }
    
    render() {
        return (
            <View style={S.container}>
                <Text>Login</Text>
                <Button title="Google"
                    onPress={this._signIn}></Button>
            </View>
        );
    }
}