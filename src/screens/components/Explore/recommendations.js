import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class Recommendations extends React.Component {

    render() {
        return (
            <View style={{width: this.props.width/2 - 30, height: this.props.width/2 - 30, borderWidth:0.5, borderColor:"#dddddd"}}>
                <View style={{flex: 1}}>
                    <Image style={{flex:1, width:null, height:null, resizeMode:"cover"}}
                        source={require("../../../../assets/food.jpg")} />
                </View>
                <View style={{flex: 1, alignItems: "flex-start", justifyContent: "space-evenly", paddingLeft: 10}}>
                    <Text style={{fontSize:14, fontWeight:"bold"}}>{this.props.meal}</Text>
                    <Text style={{fontSize:12, color:"#0000cd"}}>{this.props.time}</Text>
                    <Icon name="ios-heart" size={20} />
                </View>
            </View>
        );
    }
}