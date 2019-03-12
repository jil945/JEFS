import React from "react";
import PropTypes from "prop-types";
import { 
    ActivityIndicator,
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
import RNPickerSelect from "react-native-picker-select";

import Auth from "../util/auth";
import _s from "../styles";
import { Tasks } from "../util/tasks";
import GoogleSignInButton from "./components/GoogleSignInButton";

const cuisineOptions = ["african", "chinese", "japanese", "korean", "vietnamese", "thai", "indian", "british", "irish", "french", "italian", "mexican", "spanish", "middle", "eastern", "jewish", "american", "cajun", "southern", "greek", "german", "nordic", "european", "caribbean", "latin"];

export default class Login extends React.Component {
    static navigationOptions = {
        header: null 
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
            cuisineTypes: new Set()
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
        // console.log(profile);
        this.setState({ profile });

        // Check if profile is set
        let newProfile = !(await Auth.checkProfileExistsAsync());
        this.setState({ newProfile, loading: false });

        if (!newProfile) {
            this._mainPage();
        }
    }

    _validateProfile = () => {
        let p = this.state.profile;

        // Check required keys
        let requiredKeys = ["name", "weight", "height", "bmigoal", "gender", "age"];
        let isReq = requiredKeys.every(k => !!p[k]);
        if (!isReq) {
            return false;
        }

        // Check positive numbers
        let positiveNumbers = ["weight", "height", "bmigoal", "age"];
        let isPositive = positiveNumbers.every(k => p[k] > 0);
        if (!isPositive) {
            return false;
        }

        // Check age is a number
        if (!Number.isInteger(p.age)) {
            return false;
        }

        // Check cuisinetypes is not empty
        if (this.state.cuisineTypes.size <= 0) {
            return false;
        }

        return true;
    }

    _submit = async () => {
        console.log(this.state.profile);

        if (!this._validateProfile()) {
            return;
        }
        
        let cuisine = [];
        this.state.cuisineTypes.forEach(c => cuisine.push(c));

        let profile = {
            ...this.state.profile,
            cuisine: cuisine
        };

        let resp = await Auth.createUserProfileAsync(profile);
        if (resp.status === 200 || resp.status === 201) {
            this._mainPage();
        }
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

        let placeholder = {
            label: "Gender",
            value: null
        };

        return (
            <RNPickerSelect 
                placeholder={placeholder}
                items={options}
                value={this.state.profile.gender}
                onValueChange={(val) => this.setState(state => {
                    state.profile.gender = val;
                    return state;
                })}
                style={pickerStyle}></RNPickerSelect>
        );
    }

    cuisinePicker() {
        return cuisineOptions.map(c => {
            let capitalized = c.charAt(0).toUpperCase() + c.slice(1);
            let pressed = () => this.setState(state => {
                if (state.cuisineTypes.has(c)) {
                    state.cuisineTypes.delete(c);
                } else {
                    state.cuisineTypes.add(c);
                }
                return state.cuisineTypes;
            });
            return (
                <CheckBox title={capitalized} 
                    key={c}
                    checked={this.state.cuisineTypes.has(c)}
                    onPress={pressed}></CheckBox>
            );
        });
    }

    componentWillMount = async () => {
        try {
            if (await Auth.trySigningIn()) {
                this._next();
            }
        } catch(e){}
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1}}>
                { this.state.loading ? (
                    <ActivityIndicator></ActivityIndicator>
                ) : this.state.newProfile ? (
                    <ScrollView>
                        <View style={{ paddingHorizontal: 20}}>
                            <Text>New Profile</Text>
                            <TextInput placeholder="Age" 
                                keyboardType="numeric"
                                onChangeText={(text) => this.setState(state => {
                                    state.profile.age = parseInt(text);
                                    return state;
                                })}></TextInput>
                            { this.genderPicker() }
                            <TextInput placeholder="Height (cm)" 
                                keyboardType="numeric"
                                onChangeText={(text) => this.setState(state => {
                                    state.profile.height = parseFloat(text);
                                    return state;
                                })}></TextInput>
                            <TextInput placeholder="Weight (kg)" 
                                keyboardType="numeric"
                                onChangeText={(text) => this.setState(state => {
                                    state.profile.weight = parseFloat(text);
                                    return state;
                                })}></TextInput>
                            <Slider minimumValue={0} 
                                maximumValue={40} 
                                onValueChange={(val) => this.setState(state => {
                                    state.profile.bmigoal = parseFloat(val);
                                    return state;
                                })}></Slider>
                            { this.cuisinePicker() }
                            <Button style={{ paddingVertical: 12 }}
                                title="Submit" 
                                onPress={this._submit}></Button>

                        </View>
                    </ScrollView>
                ) : (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <GoogleSignInButton onPress={this._signIn} disabled={this.state.loading}></GoogleSignInButton>
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

const pickerStyle = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 8,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});