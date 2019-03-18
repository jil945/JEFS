import React from "react";
import PropTypes from "prop-types";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";

import RecipeCard from "./components/explore/RecipeCard";
import RecipeModal from "./components/explore/RecipeModal";
import http, { WEEKDAYS } from "../util/http";
import RecipeInfo from "../util/recipeInfo";

export default class Explore extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-search" color={tintColor} size={24}></Icon>
        )
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            query: "",
            like: new Set(), // TODO remove
            isModalVisible: false,
            modalRecipe: {},
            recRecipe: [],
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

    _viewRecipe = (recipe) => {
        this.setState({ modalRecipe: recipe, isModalVisible: true });
    }

    componentDidMount = async () => {
        if (this.state.recRecipe.length <= 0) {
            try {
                let dailyRec = await RecipeInfo.getRecommendation();
                let recRecipe = Object.values(dailyRec);
                this.setState({ recRecipe });
            } catch(e) {
                console.log(e);
            }
        }
    }

    _renderRecRecipes = () => {
        return this.state.recRecipe.map(recipe => {
            let id = recipe.id;
            return (
                <RecipeCard key={recipe.id}
                    item={recipe}
                    like={this.state.like.has(id)}
                    onPress={() => this._viewRecipe(recipe)}
                    onLike={(val) => this._onLike(val, id)}></RecipeCard>
            );
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <RecipeModal item={this.state.modalRecipe}
                    isVisible={this.state.isModalVisible} 
                    closeModal={() => this.setState({ isModalVisible: false })}></RecipeModal>
                <SearchBar placeholder={"Search for meals"}
                    inputStyle={{ color: "black" }}
                    lightTheme
                    value={this.state.query}
                    onChangeText={this._onSearch}
                    onClear={this._onClearSearch}></SearchBar>

                <ScrollView scrollEventThrottle={16}>
                    <View style={{ paddingTop: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20 }}>
                            Explore our Suggested Meals for Today
                        </Text>
                        <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                            { this._renderRecRecipes() }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}