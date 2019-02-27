import React from "react";
import PropTypes from "prop-types";
import { 
    ActivityIndicator,
    Image, 
    TouchableHighlight,
    View, 
    ViewPropTypes
} from "react-native";

import Auth from "../util/auth";
import S from "../styles";

const normalBtnUri   = require("../../assets/google/btn_google_signin_dark_normal_web.png");
const disabledBtnUri = require("../../assets/google/btn_google_signin_dark_disabled_web.png");
const pressedBtnUri  = require("../../assets/google/btn_google_signin_dark_pressed_web.png");
const focusBtnUri    = require("../../assets/google/btn_google_signin_dark_focus_web.png");
export class GoogleSignInButton extends React.Component {
    static propTypes = {
        style: ViewPropTypes.style,
        onPress: PropTypes.func,
        disabled: PropTypes.bool
    }
    static defaultProps = {
        // onPress: () => null,
        disabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            pressed: false,
        };
    }

    _onPressIn = () => {
        this.setState({ pressed: true });
    }
    _onPressOut = () => {
        this.props.onPress();
        this.setState({ pressed: false });
    }

    _btnImgSrc = () => {
        if (this.props.disabled) {
            return disabledBtnUri;
        }

        if (this.state.focus) {
            return focusBtnUri;
        }

        if (this.state.pressed) {
            return pressedBtnUri;
        }

        return normalBtnUri;
    }

    render() {
        return (
            <TouchableHighlight disabled={this.props.disabled}
                onPressIn={this._onPressIn}
                onPressOut={this._onPressOut}
                onFocus={() => this.setState({ focus: true })}
                onBlur={() => this.setState({ focus: false })}>
                <Image style={this.props.style}
                    source={this._btnImgSrc()}></Image>
            </TouchableHighlight>
        );
    }
}

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
                { this.state.loading ? (
                    <ActivityIndicator></ActivityIndicator>
                ) : (
                    <GoogleSignInButton onPress={this._signIn} disabled={this.state.loading}></GoogleSignInButton>
                )}
                
            </View>
        );
    }
}