import React from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import _s from "../styles";

export default class Profile extends React.Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };
    _cancel = () => {
    //TODO
        this.props.navigation.navigate("Main");
    }
    _save = () => {
    //TODO
        this.props.navigation.navigate("Main");
    }
    render() {
        return (
            <View style={{ flex: 1}}>
                <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                    borderBottomColor: "#eae5e5", paddingTop: 10, backgroundColor: "rgb(212, 227, 252)"}}>
                    <Button title="Cancel" style = {{ borderRadius:10}} onPress={this._cancel}></Button>
                    <Button title="Save" style = {{ borderRadius:10}} onPress={this._save}></Button>
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                    borderBottomColor: "#eae5e5", paddingTop: 20}}>
                    <Icon name="ios-arrow-back" size={20}></Icon>
                    <Icon name="ios-calendar" size={20}></Icon>
                    <Text style={{fontSize:14, fontWeight:"700"}}>Fri, Feb 08</Text>
                    <Icon name="ios-arrow-forward" size={20}></Icon>
                </View>
            </View>
        );
    }
}