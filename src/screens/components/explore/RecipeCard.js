import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, ViewPropTypes, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");
const defaultImg = require("../../../../assets/food.jpg");

export default class RecipeCard extends React.Component {
    static propTypes = {
        like: PropTypes.bool,
        onLike: PropTypes.func,
        onPress: PropTypes.func,
        item: PropTypes.object,
        style: ViewPropTypes.style
    }

    static defaultProps = {
        item: {},
        style: {
            width: width / 2 - 30,
            height: width / 2 - 30,
            borderWidth: 0.5, 
            borderColor:"#dddddd", 
            margin: 5
        },
        onLike: v => null,
        onPress: v => null,
    }

    _onLike = () => {
        this.props.onLike(!this.props.like);
    }
    _onPress = (e) => {
        this.props.onPress(e);
    }

    render() {
        let src = this.props.item.image ? { url: this.props.item.image } : defaultImg;
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={this.props.style}>
                    <View style={{ flex: 1 }}>
                        <Image style={{ flex:1, width:null, height:null, resizeMode:"cover" }}
                            source={src}></Image>
                    </View>
                    <View style={{flex: 1, alignItems: "flex-start", justifyContent: "space-evenly", paddingLeft: 10}}>
                        <Text style={{fontSize:14, fontWeight:"bold"}}>{this.props.item.title}</Text>
                        {/* <Text style={{fontSize:12, color:"#0000cd"}}>{this.props.time}</Text> */}
                        <Icon name={this.props.like ? "ios-heart" : "ios-heart-empty"} size={20} onPress={this._onLike} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}