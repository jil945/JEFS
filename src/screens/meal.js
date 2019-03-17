import React from "react";
import { View, FlatList, Image, TouchableHighlight, StyleSheet, SafeAreaView, Text, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");
const BG_COLOR = "#cfdef7";
const ICON_SIZE = 40;
const s = StyleSheet.create({
    header: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#eae5e5", backgroundColor: BG_COLOR },
    left: { flex: 1, marginLeft: 16},
    center: { flex: 1, fontSize: 24, fontWeight: "700" },
    right: { flex: 1, alignItems: "center" }
});
const MEAL = {
    "glutenFree": false,
    "ingredients": [
        "arugula",
        "baguette",
        "basil",
        "butter",
        "canned tomatoes",
        "crushed red pepper",
        "eggs",
        "garlic cloves",
        "olive oil",
        "onion",
        "parmesan cheese",
        "parmesan cheese",
        "rosemary",
        "salt and pepper",
        "salt and pepper",
        "thyme"
    ],
    "id": 640636,
    "title": "Creamy Egg Marinara Breakfast Dip",
    "cuisines": [],
    "vegan": false,
    "image": "https://spoonacular.com/recipeImages/640636-556x370.jpg",
    "vegetarian": false
};
export default class Meal extends React.Component {
    constructor(props) {
        super(props);
    }
    _back = () => {
        this.props.navigation.navigate("Explore");
        //update state or database
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={s.header}>
                    <TouchableHighlight style={s.left}
                        underlayColor={BG_COLOR}
                        onPress={this._back}>
                        <Icon name="ios-arrow-back" size={ICON_SIZE}></Icon>
                    </TouchableHighlight>
                    <Text style={s.center}>
                        {MEAL.title}
                    </Text>
                </View>
                <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: "700" }}>{MEAL.title}</Text>
                    <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                        <Image style={{
                            flex: 1, height: null, width: null, resizeMode: "cover",
                            borderRadius: 5, borderWidth: 1, borderColor: "#dddddd"
                        }} source={{ uri: MEAL.image }} />
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 16 }}>Ingredients</Text>
                </View>
                <View style={{
                    flex: 1,
                    paddingTop: 22,
                    marginLeft: 20
                }}>
                    <FlatList
                        data={MEAL.ingredients}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => <Text style={{
                            padding: 20,
                            fontSize: 18,
                            height: 22
                        }}>{item}</Text>}
                    />
                </View>
            </SafeAreaView>
        );
    }
}