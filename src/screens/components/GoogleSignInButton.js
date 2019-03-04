import React from "react";
import PropTypes from "prop-types";
import { 
    Image, 
    TouchableHighlight,
    ViewPropTypes
} from "react-native";

const normalBtnUri   = require("../../../assets/google/btn_google_signin_dark_normal_web.png");
const disabledBtnUri = require("../../../assets/google/btn_google_signin_dark_disabled_web.png");
const pressedBtnUri  = require("../../../assets/google/btn_google_signin_dark_pressed_web.png");
const focusBtnUri    = require("../../../assets/google/btn_google_signin_dark_focus_web.png");
export default class GoogleSignInButton extends React.Component {
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