import React from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { PieChart, BarChart, StackedBarChart } from "react-native-svg-charts";
import PureChart from "react-native-pure-chart";

export default class Day extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-today" color={tintColor} size={24}></Icon>
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }
    _segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        });
    }

    _renderSection = (keys, colors, nutrientData, pieData, barData, data, Labels) => {
        switch (this.state.activeIndex) {
        case 0:

            return (
                <View style={{ flex: 1}}>
                    <PieChart
                        style={{ height: 200 }}
                        valueAccessor={({ item }) => item.amount}
                        data={data}
                        spacing={0}
                        outerRadius={"95%"}>
                        <Labels/>
                    </PieChart>
                    <View style={{borderBottomColor: "#dddddd", borderBottomWidth: 1}}></View>
                    <View style={{ flexDirection: "row", height: 200, paddingVertical: 16 }}>
                        <BarChart style={{ flex: 1 }}
                            data={barData} svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
                            contentInset={{ top: 10, bottom: 10 }}>
                        </BarChart>
                    </View>
                </View>
            );
        case 1:
            return (
                <View style={{ flex: 1}}>
                    <PureChart data={pieData} type='pie' />
                    <View style={{borderBottomColor: "#dddddd", borderBottomWidth: 1}}></View>
                        <StackedBarChart
                            style={ { height: 200 } }
                            keys={ keys }
                            colors={ colors }
                            data={ nutrientData }
                            showGrid={ false }
                            contentInset={ { top: 30, bottom: 30 } }
                        />
                </View>
            );
        case 2:
            return (
                <View style={{ flex: 1}}>
                    <PieChart
                        style={{ height: 200 }}
                        valueAccessor={({ item }) => item.amount}
                        data={data}
                        spacing={0}
                        outerRadius={"95%"}>
                        <Labels/>
                    </PieChart>
                    <View style={{borderBottomColor: "#dddddd", borderBottomWidth: 1}}></View>
                    <View style={{ flexDirection: "row", height: 200, paddingVertical: 16 }}>
                        <BarChart style={{ flex: 1 }}
                            data={barData} svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
                            contentInset={{ top: 10, bottom: 10 }}>
                        </BarChart>
                    </View>
                </View>
            );
        default:
            return null;
        }
    }
    render() {
        const nutrientData = [
            {
                day: "Sunday",
                fat: 30,
                carb: 50,
                protein: 20
            },
            {
                day: "Monday",
                fat: 40,
                carb: 40,
                protein: 20
            },
            {
                day: "Tuesday",
                fat: 45,
                carb: 45,
                protein: 10
            },
            {
                day: "Wednesday",
                fat: 40,
                carb: 50,
                protein: 10
            }
        ];
        const colors = [ "yellow", "green", "blue" ];
        const keys   = [ "fat", "carb", "protein" ];
        const barData = [ 10, 5, 25, 15, 20 ];
        const pieData = [
            {
                value: 45,
                label: "Fat",
                color: "yellow",
            }, {
                value: 41,
                label: "Carb",
                color: "green"
            }, {
                value: 15,
                label: "Protein",
                color: "blue"
            }

        ];
        const data = [
            {
                key: 1,
                amount: 80,
                svg: { fill: "green" }//for the calories taken within calorie budget
            },
            {
                key: 2,
                amount: 0,
                svg: { fill: "red" }//calories beyond the calories budget
            },
            {
                key: 3,
                amount: 20,
                svg: { fill: "white" }//for the empty space
            }
        ];

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={"white"}
                        textAnchor={"middle"}
                        alignmentBaseline={"middle"}
                        fontSize={24}
                        stroke={"black"}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </Text>
                );
            });
        };
        
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                    borderBottomColor: "#eae5e5", paddingTop: 20, backgroundColor: "#cfdef7"}}>
                    <Icon name="ios-arrow-back" size={20}></Icon>
                    <Icon name="ios-calendar" size={20}></Icon>
                    <Text style={{fontSize:14, fontWeight:"700"}}>Fri, Feb 08</Text>
                    <Icon name="ios-arrow-forward" size={20}></Icon>
                </View>
                <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                    borderBottomColor: "#eae5e5"}}>
                    <Button style={[this.state.activeIndex == 0 ? {} : {color:"grey"}]} 
                        title="Calories" onPress={() => this._segmentClicked(0)} active={this.state.activeIndex == 0}>
                    </Button>
                    <Button style={[this.state.activeIndex == 1 ? {} : {color:"grey"}]} 
                        title="Nutrients" 
                        onPress={() => this._segmentClicked(1)} active={this.state.activeIndex == 1}>
                    </Button>
                    <Button style={[this.state.activeIndex == 2 ? {} : {color:"grey"}]} 
                        title="Steps" 
                        onPress={() => this._segmentClicked(2)} active={this.state.activeIndex == 2}>
                    </Button>
                </View>
                {this._renderSection(keys, colors, nutrientData, pieData, barData, data, Labels)}
            </SafeAreaView>
        );
    }
}