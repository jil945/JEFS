import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Platform, StatusBar, ScrollView, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";

import Recommendations from "./components/explore/recommendations";

import { GET_WORKOUT, GET_RECIPIE } from "../util/http";

const { width } = Dimensions.get("window");

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
    _viewMeal = () => {
        this.props.navigation.navigate("Meal");
    }
    componentWillMount = async () => {
        let recipie = await GET_RECIPIE;
        let workout = await GET_WORKOUT;
    }

    render() {
        const headerHeight = Platform.OS === "android" ? 100 + StatusBar.currentHeight : 80;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <SearchBar placeholder={"Search for meals or workouts"}
                    inputStyle={{ color: "black" }}
                    lightTheme
                    value={this.state.query}
                    onChangeText={this._onSearch}
                    onClear={this._onClearSearch}></SearchBar>

                <ScrollView scrollEventThrottle={16}>
                    <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20 }}>
                            Select 10 from the collection of Meals
                        </Text>
                        <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                            <ScrollView horizontal
                                showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity onPress={this._viewMeal}>
                                    <Recommendations width={width} meal="Orange Chicken - 473 calories" time="10 Minutes" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._viewMeal}>
                                    <Recommendations width={width} meal="Chocolate Chip Cookie - 100 calories" time="20 Minutes" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._viewMeal}>
                                    <Recommendations width={width} meal="Chicken fingers - 200 calories" time="20 Minutes" />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ marginTop: 40 }}>
                        <Text style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20 }}>
                            Explore our Suggested Meals for Today
                        </Text>
                        <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={this._viewMeal}>
                                <Recommendations width={width} meal="Orange Chicken - 473 calories" time="10 Minutes" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._viewMeal}>
                                <Recommendations width={width} meal="Chocolate Chip Cookie - 100 calories" time="20 Minutes" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._viewMeal}>
                                <Recommendations width={width} meal="Chicken fingers - 200 calories" time="20 Minutes" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}