import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button, SafeAreaView, TextInput, Platform, StatusBar, ScrollView, Image, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "./components/Explore/category";
import Recommendations from "./components/Explore/recommendations";

const { height, width } = Dimensions.get("window");

export default class Explore extends React.Component {
	
    componentWillMount(){
        this.startHeaderHeight = 80;
        if(Platform.OS == "android"){
            this.startHeaderHeight = 100 + StatusBar.currentHeight;
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1}}>
                <View style={{ flex: 1}}>
                    <View style={{ height: this.startHeaderHeight, backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#dddddd" }}>
                        <View style={{
                            flexDirection: "row", padding: 10,
                            backgroundColor: "white", marginHorizontal: 20,
                            shadowOffset: {width: 0, height: 0 },
                            shadowColor: "black",
                            shadowOpacity: 0.2,
                            elevation: 1,
                            marginTop:Platform.OS == "android" ? 30 : null }}>
                            <Icon name="ios-search" size={20} style={{
                                marginRight: 10}} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Search for meals or workouts"
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: "700",
                                    backgroundColor: "white"}}></TextInput>
                        </View>
                    </View>
                    <ScrollView scrollEventThrottle={16}>
                        <View style={{ flex: 1, backgroundColor: "white", 
                            paddingTop: 20}}>
                            <Text style={{fontSize:24, fontWeight:"700",
                                paddingHorizontal: 20}}>
								Explore from the collection of Exercises and Meals
                            </Text>
                            <View style={{height:130, marginTop: 20}}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}		
                                >
                                    <Category imageUri={require("../../assets/food.jpg")}
                                        name="Meals"/>
                                    <Category imageUri={require("../../assets/exercise.jpg")}
                                        name="Exercises"/>
                                </ScrollView>
                            </View>
                        </View>
                        <View style={{marginTop:40}}>
                            <Text style={{fontSize:24, fontWeight:"700",
                                paddingHorizontal: 20}}>
								Explore our Suggested Meals for Today
                            </Text>
                            <View style={{paddingHorizontal: 20, marginTop: 20, flexDirection:"row", flexWrap: "wrap", justifyContent:"space-between"}}>
                                <Recommendations width={width} meal="Orange Chicken - 473 calories" time="10 Minutes"/>
                                <Recommendations width={width} meal="Chocolate Chip Cookie - 100 calories" time="20 Minutes"/>
                                <Recommendations width={width} meal="Chicken fingers - 200 calories" time = "20 Minutes"/>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}