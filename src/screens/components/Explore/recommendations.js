import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class Recommendations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLiked: false };//get value from state
    }
    _like = () => {
        this.setState(prevState => ({isLiked: !prevState.isLiked}));
        //update state or database
    }
    render() {
        return (
            <View style={{width: this.props.width/2 - 30, height: this.props.width/2 - 30, borderWidth:0.5, borderColor:"#dddddd", margin:5}}>
                <View style={{flex: 1}}>
                    <Image style={{flex:1, width:null, height:null, resizeMode:"cover"}}
                        source={require("../../../../assets/food.jpg")} />
                </View>
                <View style={{flex: 1, alignItems: "flex-start", justifyContent: "space-evenly", paddingLeft: 10}}>
                    <Text style={{fontSize:14, fontWeight:"bold"}}>{this.props.meal}</Text>
                    <Text style={{fontSize:12, color:"#0000cd"}}>{this.props.time}</Text>
                    <Icon name={this.state.isLiked ? "ios-heart" : "ios-heart-empty"} size={20} onPress={this._like} />
                </View>
            </View>
        );
    }
}