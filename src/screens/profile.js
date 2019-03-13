import React from "react";
import { View, SafeAreaView, Text, Button, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateHeader from "./components/DateHeader";

import moment from "moment";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: "131 lb",
            currentDate: new moment(),
        };
    }

    _cancel = () => {
    //TODO
        this.props.navigation.navigate("Goal");
    }
    _save = () => {
    //TODO
        this.props.navigation.navigate("Main");
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                    borderBottomColor: "#eae5e5", paddingTop: 10, backgroundColor: "#cfdef7"}}>
                    <Button title="Cancel" style = {{ borderRadius:10}} onPress={this._cancel}></Button>
                    <Text style={{fontSize:20, fontWeight:"700"}}>Weight</Text>
                    <Button title="Save" style = {{ borderRadius:10}} onPress={this._save}></Button>
                </View>
                <DateHeader value={this.state.currentDate}
                    onChange={(d) => this.setState(state => {
                        state.currentDate = d;
                        return state;
                    })}></DateHeader>
                <TextInput
                    style={{height: 40, borderColor: "gray", borderWidth: 1, justifyContent: "center", alignItems: "center"}}
                    keyboardType = 'numeric'
                    onChangeText={(text) => this.setState({text})}
                    textAlign={"center"}
                    value={this.state.text}/>
            </SafeAreaView>
        );
    }
}