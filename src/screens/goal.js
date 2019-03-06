import React from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView, Text, Button } from "react-native";
import { LineChart, Grid } from 'react-native-svg-charts'
import Icon from "react-native-vector-icons/Ionicons";

import _s from "../styles";

export default class Goal extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-contact" color={tintColor} size={24}></Icon>
        )
    };

    _updateWeight = () => {
        this.props.navigation.navigate("Profile");
    }
    render() {
        const data = [ 122, 125, 131, 129, 126, 128, 125, 121 ]

        return (
            <View style={{ flex: 1}}>
            <View style={{borderBottomColor: "#dddddd", borderBottomWidth: 1, paddingTop: 16}}></View>
            <LineChart
                style={{ height: 200 }}
                data={ data }
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
            <Grid/>
            </LineChart>
            <Button title="Update Your Weight" style = {{ borderRadius:10}} onPress={this._updateWeight}></Button>
            </View>
        );
    }
}