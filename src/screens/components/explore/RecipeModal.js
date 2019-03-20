import React from "react";
import PropTypes from "prop-types";
import { Text, Button } from "react-native-elements";
import {  ActivityIndicator, ViewPropTypes, View, FlatList, Image, ImageBackground, TouchableHighlight, StyleSheet, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import RecipeInfo from "../../../util/recipeInfo";

export default class RecipeModal extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        item: PropTypes.shape({
            id: PropTypes.number,
            ingredients: PropTypes.array
        }),
        style: ViewPropTypes.style,
    }

    static defaultProps = {
        isVisible: false,
    }

    constructor(props) {
        super(props);

        this.state = {
            item: {
                ingredients: [],
            },
            loadingId: null,
        };
    }

    _fetchRecipe = async () => {
        let id = this.state.loadingId;
        if (!id) {
            return;
        }

        try {
            let recipe = await RecipeInfo.fetchRecipe(id);
            console.log(recipe.analyzedInstructions.steps);
            this.setState(state => {
                state.item = recipe;
                return state;
            });
        } catch(e) {
            this.setState(state => {
                state.item = {
                    ingredients: [],
                };
                return state;
            });
        }
    }

    _consumeRecipe = async () => {
        await RecipeInfo.consumeRecipe(this.state.item.id);
        this.props.closeModal();
    }

    _onModalShow = () => {
        let id = this.props.item.id;
        this.setState({ loadingId: id });

        if (id && RecipeInfo.hasCache(id)) {
            this.setState(state => {
                state.item = RecipeInfo.getCache(id);
                return state;
            });
        } else {
            this._fetchRecipe();
        }
    }

    _renderRecipe = () => {
        return (
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View style={{ height: 180 }}>
                    <ImageBackground style={{ flex: 1, width: null, height: null, resizeMode: "cover" }}
                        source={{ uri: this.state.item.image }}>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableHighlight onPress={this.props.closeModal} style={{ paddingRight: 10 }}>
                                <Icon name="ios-close" style={{ position: "absolute", top: -5, right: 5, fontSize: 60, fontWeight: "700", color: "white" }} ></Icon>
                            </TouchableHighlight>
                            
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: "700"}}>{this.state.item.title}</Text>
                    <Text style={{ fontSize: 20, fontWeight: "700"}}>Ingredients</Text>
                    <View style={{ paddingLeft: 15 }}>
                        {
                            this.state.item.extendedIngredients.map((o, idx) => {
                                return (
                                    <Text key={idx}>{o.originalString}</Text>
                                );
                            })
                        }
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: "700"}}>Instructions</Text>
                    <View>
                        {/* 
                            this.state.item.analyzedInstructions.steps.map((o, idx) => {
                                return (
                                    <Text key={idx}>{o.step}</Text>
                                );
                            })
                         */}
                    </View>
                </View>
                <View>
                    <Button title={"Eat"} 
                        style={{ padding: 10 }}
                        onPress={this._consumeRecipe}></Button>
                </View>
            </View>
        );
    }

    render() {
        return (
            <Modal hasBackdrop 
                isVisible={this.props.isVisible}
                onBackdropPress={this.props.closeModal}
                onModalShow={this._onModalShow}
                swipeDirection="down"
                onSwipeComplete={this.props.closeModal}>
                <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                    { this.state.item.id !== this.state.loadingId ? (
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator></ActivityIndicator>
                        </View>
                    ) : (
                        this._renderRecipe()
                    )}
                </SafeAreaView>
            </Modal>
        );
    }
}