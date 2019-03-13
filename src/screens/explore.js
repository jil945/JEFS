import React from "react";
import { View, Text, SafeAreaView, TextInput, Platform, StatusBar, ScrollView, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";

import Category from "./components/explore/category";
import Recommendations from "./components/explore/recommendations";

const { height, width } = Dimensions.get("window");

export default class Explore extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-search" color={tintColor} size={24}></Icon>
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            query: "",  
        };
    }

    _onSearch = (query) => {
        this.setState(state => {
            state.query = query;
            return state;
        });
    }
    _onClearSearch = () => {
        this.setState(state => {
            state.query = "";
            return state;
        });
    }
	
    componentWillMount(){
        /* this.startHeaderHeight = 80;
        if (Platform.OS == "android") {
            this.startHeaderHeight = 100 + StatusBar.currentHeight;
        } */
    }
    
    render() {
        const headerHeight = Platform.OS  === "android" ? 100 + StatusBar.currentHeight : 80;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <SearchBar placeholder={"Search for meals or workouts"} 
                    inputStyle={{ color: "black" }}
                    lightTheme
                    value={this.state.query}
                    onChangeText={this._onSearch}
                    onClear={this._onClearSearch}></SearchBar>

                <ScrollView scrollEventThrottle={16}>
                    <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20}}>
                        <Text style={{fontSize:24, fontWeight:"700", paddingHorizontal: 20}}>
							Explore from the collection of Exercises and Meals
                        </Text>
                        <View style={{height:130, marginTop: 20}}>
                            <ScrollView horizontal
                                showsHorizontalScrollIndicator={false}>
                                <Category imageUri={require("../../assets/food.jpg")}
                                    name="Meals"/>
                                <Category imageUri={require("../../assets/exercise.jpg")}
                                    name="Exercises"/>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{marginTop:40}}>
                        <Text style={{fontSize:24, fontWeight:"700", paddingHorizontal: 20}}>
                            Explore our Suggested Meals for Today
                        </Text>
                        <View style={{paddingHorizontal: 20, marginTop: 20, flexDirection:"row", flexWrap: "wrap", justifyContent:"space-between"}}>
                            <Recommendations width={width} meal="Orange Chicken - 473 calories" time="10 Minutes"/>
                            <Recommendations width={width} meal="Chocolate Chip Cookie - 100 calories" time="20 Minutes"/>
                            <Recommendations width={width} meal="Chicken fingers - 200 calories" time = "20 Minutes"/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}