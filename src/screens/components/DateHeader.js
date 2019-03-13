import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";

const DATE_FORMAT = "MMM Do YY";
const BG_COLOR = "#cfdef7";
const ICON_SIZE = 20;
const s = StyleSheet.create({
    header:     { flexDirection: "row", justifyContent: "space-evenly", borderBottomWidth: 1, borderBottomColor: "#eae5e5", paddingVertical: 12, backgroundColor: BG_COLOR },
    left:       { flex: 1, alignItems: "center" },
    center:     { flex: 1, flexDirection: "row", alignItems: "center" },
    right:      { flex: 1, alignItems: "center" }
});

export default class DateHeader extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.instanceOf(moment)
    };
    static defaultProps = {
        value: new moment()
    }

    constructor(props) {
        super(props);
    }

    _incrementDate = () => {
        let inc = this.props.value.add(1, "days");
        this.props.onChange(inc);
    }
    _decrementDate = () => {
        let dec = this.props.value.subtract(1, "days");
        this.props.onChange(dec);
    }
    _setToday = () => {
        let today = new moment();
        this.props.onChange(today);
    }

    render() {
        return (
            <View style={s.header}>
                <TouchableHighlight style={s.left} 
                    underlayColor={BG_COLOR}
                    onPress={this._decrementDate}>
                    <Icon name="ios-arrow-back" size={ICON_SIZE}></Icon>
                </TouchableHighlight>
                <View style={s.center}>
                    <TouchableHighlight style={{ paddingHorizontal: 10 }}
                        underlayColor={BG_COLOR}
                        onPress={this._setToday}>
                        <Icon name="ios-calendar" size={ICON_SIZE}></Icon>
                    </TouchableHighlight>
                    <Text style={{fontSize:14}}>
                        {this.props.value.format(DATE_FORMAT)}
                    </Text>
                </View>
                <TouchableHighlight style={s.right} 
                    underlayColor={BG_COLOR}
                    onPress={this._incrementDate}>
                    <Icon name="ios-arrow-forward" size={ICON_SIZE}></Icon>
                </TouchableHighlight>
            </View>
        );
    }
}