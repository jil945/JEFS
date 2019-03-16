import React from "react";
import PropTypes from "prop-types";
import { 
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import {
    Text, CheckBox, Button, Header, Input, Avatar
} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";

import Auth from "../util/auth";
import _s from "../styles";
import { Tasks } from "../util/tasks";
import GoogleSignInButton from "./components/GoogleSignInButton";

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

    componentDidMount = async () => {
        try {
            if (await Auth.trySigningIn()) {
                let _t = this;
                setTimeout(() => _t._next());
            }
        } catch(e){}
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
        let requiredKeys = ["name", "weight", "height", "targetWeight", "gender", "age"];
        let isReq = requiredKeys.every(k => !!p[k]);
        if (!isReq) {
            return false;
        }

        // Check positive numbers
        let positiveNumbers = ["weight", "height", "targetWeight", "age"];
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
        if (!this._validateProfile()) {
            return;
        }
        
        // Insert cuisine
        let cuisine = [];
        this.state.cuisineTypes.forEach(c => cuisine.push(c));

        // Calculate BMI goal
        let bmigoal = this.state.profile.targetWeight / Math.pow(this.state.profile.height, 2);

        let profile = {
            ...this.state.profile,
            bmigoal: bmigoal,
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
            label: "",
            value: null
        };

        return (
            <View>
                <Text style={{ color: "gray", fontSize: 20 }}>Gender</Text>
                <RNPickerSelect 
                    label="Gender"
                    placeholder={placeholder}
                    items={options}
                    value={this.state.profile.gender}
                    onValueChange={(val) => this.setState(state => {
                        state.profile.gender = val;
                        return state;
                    })}
                    style={pickerStyle}></RNPickerSelect>
            </View>
        );
    }

    cuisinePicker() {
        const cuisineOptions = ["african", "chinese", "japanese", "korean", "vietnamese", "thai", "indian", "british", "irish", "french", "italian", "mexican", "spanish", "middle", "eastern", "jewish", "american", "cajun", "southern", "greek", "german", "nordic", "european", "caribbean", "latin"];

        let cuisineCheckBoxes = cuisineOptions.map(c => {
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

        return (
            <View>
                <Text style={{ color: "gray", fontSize: 20 }}>Preferred Cuisines (Select at least 2)</Text>
                { cuisineCheckBoxes }
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Header centerComponent={{
                        text: this.state.newProfile ? "Create New Profile" : "Login",
                        style: { color: "#fff", fontWeight: "bold" }
                    }}></Header>
                    { this.state.loading ? (
                        <ActivityIndicator></ActivityIndicator>
                    ) : this.state.newProfile ? (
                        <ScrollView>
                            <View style={{ padding: 20 }}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Avatar source={{ uri: this.state.profile.picture }}></Avatar>
                                </View>
                                <Input label="Name"
                                    value={this.state.profile.name}
                                    onChangeText={(text) => this.setState(state => {
                                        state.profile.name = text;
                                        return state;
                                    })}></Input>
                                <Input label="Age" 
                                    keyboardType="number-pad"
                                    onChangeText={(text) => this.setState(state => {
                                        state.profile.age = parseInt(text);
                                        return state;
                                    })}></Input>
                                { this.genderPicker() }
                                <Input label="Height (cm)" 
                                    keyboardType="numeric"
                                    onChangeText={(text) => this.setState(state => {
                                        state.profile.height = parseFloat(text);
                                        return state;
                                    })}></Input>
                                <Input label="Weight (kg)" 
                                    keyboardType="numeric"
                                    onChangeText={(text) => this.setState(state => {
                                        state.profile.weight = parseFloat(text);
                                        return state;
                                    })}></Input>
                                <Input label="Target Weight (kg)"
                                    keyboardType="numeric"
                                    onChangeText={(text) => this.setState(state => {
                                        state.profile.targetWeight = parseFloat(text);
                                        return state;
                                    })}></Input>
                                { this.cuisinePicker() }
                                <Button style={{ paddingVertical: 12 }}
                                    title="Submit" 
                                    onPress={this._submit}></Button>
                                { __DEV__  && <Button style={{ padding: 12 }} title="Main Page" onPress={this._mainPage}></Button> }

                            </View>
                        </ScrollView>
                    ) : (
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start"}}>
                            <View style={_s.container}>
                                <Text h4 >Just Enjoy Out Food Suggestions</Text>
                                <Text h4>(JEFS)</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
                                <GoogleSignInButton onPress={this._signIn} disabled={this.state.loading}></GoogleSignInButton>
                            </View>
                        </View>
                    )}
                </View>
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