import React from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class Day extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-today" color={tintColor} size={24}></Icon>
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }
    _segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        });
    }
    
    _renderSection = () => {
        switch (this.state.activeIndex) {
        case 0:
            return (
                <View>
                    <Text>Calories</Text>
                </View>
            );
        case 1:
            return (
                <View>
                    <Text>Nutrients</Text>
                </View>
            );
        case 2:
            return (
                <View>
                    <Text>Steps</Text>
                </View>
            );
        default:
            return null;
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                    borderBottomColor: "#eae5e5"}}>
                    <Button style={[this.state.activeIndex == 0 ? {} : {color:"grey"}]} 
                        title="Calories" onPress={() => this._segmentClicked(0)} active={this.state.activeIndex == 0}>
                    </Button>
                    <Button style={[this.state.activeIndex == 1 ? {} : {color:"grey"}]} 
                        title="Nutrients" 
                        onPress={() => this._segmentClicked(1)} active={this.state.activeIndex == 1}>
                    </Button>
                    <Button style={[this.state.activeIndex == 2 ? {} : {color:"grey"}]} 
                        title="Steps" 
                        onPress={() => this._segmentClicked(2)} active={this.state.activeIndex == 2}>
                    </Button>
                </View>
                {this._renderSection()}
            </SafeAreaView>
        );
    }
}