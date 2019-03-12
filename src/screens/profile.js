import React from "react";
import { View, SafeAreaView, Text, Button, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";

const DATE_FORMAT = "MMM Do YY";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: "131 lb",
            currentDate: new moment(),
        };//get value from state
    }

    _incrementDate = () => {
        this.setState(state => {
            state.currentDate = state.currentDate.add(1, "days");
            return state;
        });
    }
    _decrementDate = () => {
    /* this.setState({
    currentDate: moment(this.state.currentDate).subtract(1, "days")
    }); */
        this.setState(state => {
            state.currentDate = state.currentDate.subtract(1, "days");
            return state;
        });
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
                <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                    borderBottomColor: "#eae5e5", paddingTop: 20}}>
                    <Icon name="ios-arrow-back" size={20} onPress={this._decrementDate}></Icon>
                    <Icon name="ios-calendar" size={20}></Icon>
                    <Text style={{fontSize:14}}>{this.state.currentDate.format(DATE_FORMAT)}</Text>
                    <Icon name="ios-arrow-forward" size={20} onPress={this._incrementDate}></Icon>
                </View>
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