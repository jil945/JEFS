import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native-elements";
import {  ActivityIndicator, ViewPropTypes, View, FlatList, Image, ImageBackground, TouchableHighlight, StyleSheet, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { httpRecipe } from "../../../util/http";

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
            cache: {},
            loadingId: null,
        };
    }

    _fetchRecipe = async () => {
        let id = this.state.loadingId;
        if (!id) {
            return;
        }

        if (id in this.state.cache) {
            this.setState(state => {
                state.item = state.cache[id];
                return state;
            });
        }

        try {
            let resp = await httpRecipe.get(`recipes/${id}/information`, {
                params: {
                    includeNutrition: true
                }
            });
            this.setState(state => {
                state.item = resp.data;
                state.cache[id] = resp.data; // cache for later usage
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

    _onModalShow = () => {
        this.setState({ loadingId: this.props.item.id });
        this._fetchRecipe();
    }

    _renderRecipe = () => {
        return (
            <View style={{ flex: 1 }}>
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