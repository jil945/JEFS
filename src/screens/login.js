import React from "react";
import PropTypes from "prop-types";
import { 
    ActivityIndicator,
    Picker,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Slider,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    CheckBox, Button
} from "react-native-elements";

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
            loading: false,
            newProfile: false,
            profile: {},
        };
    }

    _signIn = async () => {
        try {
            this.setState({ loading: true });
            await Auth.signIn();

            this._next();
        } catch (error) {
            console.log(error);
        }
    }

    _next = async () => {
        
        await Tasks.init();
        let profile = await Auth.getUserProfileAsync();
        console.log(profile);

        // Check if profile is set
        let newProfile = !(await Auth.checkProfileExistsAsync());
        this.setState({ newProfile, loading: false });
    }

    _submit = () => {
        // TODO
        this._mainPage();
    }

    _mainPage = () => {
        this.props.navigation.navigate("Main");
    }

    genderPicker() {
        let options = [{
            label: "Male",
            value: "male",
        }, {
            label: "Female",
            value: "female",
        }, {
            label: "Other",
            value: "other",
        }, {
            label: "Prefer not to answer",
            value: "n/a",
        }];

        let pickerItmes = [];
        for (let o of options) {
            pickerItmes.push(<Picker.Item label={o.label} value={o.value} key={o.value}></Picker.Item>);
        }

        return <Picker>{pickerItmes}</Picker>;
    }

    ethnicityPicker() {
        let options = [{
            label: "Asian",
            value: "asian",
        }, {
            label: "Black/African",
            value: "african",
        }, {
            label: "Caucasian",
            value: "caucasian",
        }, {
            label: "Hispanic/Latino",
            value: "hispanic",
        }, {
            label: "Native American",
            value: "native",
        }, {
            label: "Pacific Islander",
            value: "pacific",
        }, {
            label: "Prefer not to answer",
            value: "n/a",
        }];

        let checkBoxes = [];
        for (let o of options) {
            checkBoxes.push(<CheckBox title={o.label} key={o.value}></CheckBox>);
        }

        return checkBoxes;
    }

    componentWillMount = async () => {
        try {
            if (await Auth.trySigningIn()) {
                this._next();
            }
        } catch(e){}
    }
    
    renderView() {
        if (this.state.loading) {
            return <ActivityIndicator></ActivityIndicator>;
        } else if (this.state.newProfile) {
            return (
                <ScrollView style={{ flex: 1 }}>
                    <Text>New Profile</Text>
                    <TextInput placeholder="Age" keyboardType="numeric"></TextInput>
                    { this.genderPicker() }
                    { this.ethnicityPicker() }
                    <TextInput placeholder="Height (cm)" keyboardType="numeric"></TextInput>
                    <TextInput placeholder="Weight (kg)" keyboardType="numeric"></TextInput>
                    <Slider minimumValue={0} maximumValue={40}></Slider>
                    <Button title="Submit" onPress={this._submit}></Button>
                </ScrollView>
            );
        } else {
            return <GoogleSignInButton onPress={this._signIn} disabled={this.state.loading}></GoogleSignInButton>;
        }
    }

    render() {
        return (
            <View style={_s.container}>
                { this.state.loading ? (
                    <ActivityIndicator></ActivityIndicator>
                ) : this.state.newProfile ? (
                    <ScrollView style={{ flex: 1 }}>
                        <Text>New Profile</Text>
                        <TextInput placeholder="Age" keyboardType="numeric"></TextInput>
                        { this.genderPicker() }
                        { this.ethnicityPicker() }
                        <TextInput placeholder="Height (cm)" keyboardType="numeric"></TextInput>
                        <TextInput placeholder="Weight (kg)" keyboardType="numeric"></TextInput>
                        <Slider minimumValue={0} maximumValue={40}></Slider>
                        <Button title="Submit" onPress={this._submit}></Button>
                    </ScrollView>
                ) : (
                    <GoogleSignInButton onPress={this._signIn} disabled={this.state.loading}></GoogleSignInButton>
                )}
            </View>
        );
    }
}