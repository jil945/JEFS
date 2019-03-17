import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Platform, StatusBar, ScrollView, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";

import RecipeCard from "./components/explore/RecipeCard";

import http from "../util/http";

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
            like: new Set(),
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
    _onLike = (val, id) => {
        let hasId = this.state.like.has(id);
        if (val && !hasId) {
            this.setState(state => {
                state.like.add(id);
                return state;
            });
        } else if (!val && hasId) {
            this.setState(state => {
                state.like.delete(id);
                return state;
            });
        }
    }
    _viewMeal = () => {
        this.props.navigation.navigate("Meal");
    }
    componentDidMount = async () => {
        let resp = await http.get("recommendations/recipes");
        let recRecipe = resp.data;
    }

    render() {
        const headerHeight = Platform.OS === "android" ? 100 + StatusBar.currentHeight : 80;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <SearchBar placeholder={"Search for meals"}
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
                                <RecipeCard item={{ title: "Chicken fingers - 200 calories" }}
                                    onPress={this._viewMeal}
                                    like={this.state.like.has(1)}
                                    onLike={(val) => this._onLike(val, 1)}></RecipeCard>
                                <RecipeCard item={{ title: "Chicken fingers - 200 calories" }}
                                    onPress={this._viewMeal}
                                    like={this.state.like.has(2)}
                                    onLike={(val) => this._onLike(val, 2)}></RecipeCard>
                                <RecipeCard item={{ title: "Chicken fingers - 200 calories" }}
                                    onPress={this._viewMeal}
                                    like={this.state.like.has(3)}
                                    onLike={(val) => this._onLike(val, 3)}></RecipeCard>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ marginTop: 40 }}>
                        <Text style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20 }}>
                            Explore our Suggested Meals for Today
                        </Text>
                        <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                            <RecipeCard item={{ title: "Chicken fingers - 200 calories" }}
                                onPress={this._viewMeal}
                                like={this.state.like.has(4)}
                                onLike={(val) => this._onLike(val, 4)}></RecipeCard>
                            <RecipeCard item={{ title: "Chicken fingers - 200 calories" }}
                                onPress={this._viewMeal}
                                like={this.state.like.has(5)}
                                onLike={(val) => this._onLike(val, 5)}></RecipeCard>
                            <RecipeCard item={{ title: "Chicken fingers - 200 calories" }}
                                onPress={this._viewMeal}
                                like={this.state.like.has(6)}
                                onLike={(val) => this._onLike(val, 6)}></RecipeCard>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}