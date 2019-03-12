import React from "react";
import { View, SafeAreaView, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { PieChart, StackedBarChart, XAxis } from "react-native-svg-charts";
import PureChart from "react-native-pure-chart";
import moment from "moment";
export default class Day extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-today" color={tintColor} size={24}></Icon>
        )
    };
  
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            currentDate: new Date().toDateString(),
        };
    }
    _incrementDate = () => {
        this.setState({
            currentDate: moment(this.state.currentDate).add(1, "days")
        });
    }
  _decrementDate = () => {
      this.setState({
          currentDate: moment(this.state.currentDate).subtract(1, "days")
      });
  }
    _segmentClicked = (index) => {
        this.setState({
            activeIndex: index,
        });
    }
    _renderSection = (nutrientData, colors, calColors, keys, barKeys, stepsColors, barData, pieData, calories, steps) => {
        switch (this.state.activeIndex) {
        case 0:

            return (
                <View style={{ flex: 1, marginTop: 20}}>
                    <PieChart
                        style={{ height: 200 }}
                        valueAccessor={({ item }) => item.amount}
                        data={calories}
                        spacing={0}
                        outerRadius={"95%"}>
                    </PieChart>
                    <Text style={{marginTop: -100, marginBottom: 100, 
                        justifyContent: "center", alignItems: "center", position: "relative", textAlign: "center" }}>
                        {(calories[0].amount + calories[1].amount)*12} </Text>
                    <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                        borderBottomColor: "#eae5e5", paddingTop:16}}>
                        <View style={{ width: 20, height: 20, borderRadius: 20/2, backgroundColor: "#558241"}} />
                        <Text style={{fontSize:14}}>Calories below budget</Text>
                        <View style={{ width: 20, height: 20, borderRadius: 20/2, backgroundColor: "#f23a3a"}} />
                        <Text style={{fontSize:14}}>Calories above budget</Text>
                    </View>
                    <View style={{ height: 200, padding: 20 }}>
                        <StackedBarChart
                            style={ { height: 200 } }
                            colors={ calColors }
                            keys={ barKeys }
                            data={ barData }
                            showGrid={ false }
                            contentInset={ { top: 30, bottom: 30 } }
                        />
                        <XAxis style={{ marginHorizontal: -10, height: 30 }} data={barData} 
                            xAccessor={({ index }) => index} formatLabel={(_,index) => barData[ index ].day}
                            svg={{ fontSize: 10, fill: "black" }} contentInset={{ left: 30, right: 30 }} />
                    </View>
                </View>
            );
        case 1:
            return (
                <View style={{ flex: 1}}>
                    <View style={{justifyContent: "center", alignItems: "center", marginTop: 20}}>
                        <PureChart data={pieData} type='pie' />
                    </View>
                    <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                        borderBottomColor: "#eae5e5", marginTop:16}}>
                        <View style={{ width: 20, height: 20, borderRadius: 20/2, backgroundColor: "#dbce85"}} />
                        <Text style={{fontSize:14}}>Fat</Text>
                        <View style={{ width: 20, height: 20, borderRadius: 20/2, backgroundColor: "#a1e0d6"}} />
                        <Text style={{fontSize:14}}>Carb</Text>
                        <View style={{ width: 20, height: 20, borderRadius: 20/2, backgroundColor: "#786499"}} />
                        <Text style={{fontSize:14}}>Protein</Text>
                    </View>
                    <View style={{ height: 200, padding: 20 }}>
                        <StackedBarChart
                            style={ { height: 200 } }
                            keys={ keys }
                            colors={ colors }
                            data={ nutrientData }
                            showGrid={ false }
                            contentInset={ { top: 30, bottom: 30 } }
                        />
                        <XAxis style={{ marginHorizontal: -10, height: 30 }} data={nutrientData} 
                            xAccessor={({ index }) => index} formatLabel={(_,index) => nutrientData[ index ].day}
                            svg={{ fontSize: 10, fill: "black" }} contentInset={{ left: 30, right: 30 }} />
                    </View>
                </View>
            );
        case 2:
            return (
                <View style={{ flex: 1, marginTop:20}}>
                    <PieChart
                        style={{ height: 200 }}
                        valueAccessor={({ item }) => item.amount}
                        data={steps}
                        spacing={0}
                        outerRadius={"95%"}>
                    </PieChart>
                    <Text style={{ marginTop: -100, marginBottom: 100, 
                        justifyContent: "center", alignItems: "center", position: "relative", textAlign: "center"}}>
                        {(steps[0].amount + steps[1].amount)*5000}
                    </Text>
                    <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                        borderBottomColor: "#eae5e5", marginTop:16}}>
                        <View style={{ width: 20, height: 20, borderRadius: 20/2, backgroundColor: "#4c59c9"}} />
                        <Text style={{fontSize:14}}>Steps taken</Text>
                        <View style={{ width: 20, height: 20, borderRadius: 20/2, backgroundColor: "#558241"}} />
                        <Text style={{fontSize:14}}>Steps above goal</Text>
                    </View>
                    <View style={{ height: 200, padding: 20 }}>
                        <StackedBarChart
                            keys={ barKeys }
                            style={ { height: 200 } }
                            colors={ stepsColors }
                            data={ barData }
                            showGrid={ false } 
                            contentInset={ { top: 30, bottom: 30 } } 
                        />
                        <XAxis style={{ marginHorizontal: -10, height: 30 }} data={barData} 
                            xAccessor={({ index }) => index} formatLabel={(_,index) => barData[ index ].day}
                            svg={{ fontSize: 10, fill: "black" }} contentInset={{ left: 30, right: 30 }} />
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
                day: "Sun",
                fat: 30,
                carb: 50,
                protein: 20
            },
            {
                day: "Mon",
                fat: 40,
                carb: 40,
                protein: 20
            },
            {
                day: "Tue",
                fat: 45,
                carb: 45,
                protein: 10
            },
            {
                day: "Wed",
                fat: 40,
                carb: 50,
                protein: 10
            },
            {
                day: "Thu",
                fat: 30,
                carb: 50,
                protein: 20
            },
            {
                day: "Fri",
                fat: 40,
                carb: 40,
                protein: 20
            },
            {
                day: "Sat",
                fat: 45,
                carb: 45,
                protein: 10
            }
        ];
        const colors = [ "#dbce85", "#a1e0d6", "#786499" ];
        const calColors = [ "#558241", "#f23a3a" ];
        const keys   = [ "fat", "carb", "protein" ];
        const barKeys   = [ "within","over" ];
        const stepsColors = ["#4c59c9", "#558241"];
        const barData = [ {day: "Sunday",
            within: 1400, over:0},{day: "Mon", within:2100, over:400},{day: "Tue",
            within: 1400, over:0},{day: "Wed", within:2100, over:400},{day: "Thu",
            within: 1400, over:0},{day: "Fri", within:2100, over:400},{day: "Sat", within:1000, over:200}];
        const pieData = [
            {
                value: 45,
                label: "Fat",
                color: "#dbce85",
            }, {
                value: 41,
                label: "Carb",
                color: "#a1e0d6"
            }, {
                value: 15,
                label: "Protein",
                color: "#786499"
            }

        ];
        const calories = [
            {
                key: 1,
                amount: 80,//multiply percentage by the user's recommended calories per day
                svg: { fill: "#558241" }//for the calories taken within calorie budget
            },
            {
                key: 2,
                amount: 0,
                svg: { fill: "#f23a3a" }//calories beyond the calories budget
            },
            {
                key: 3,
                amount: 20,
                svg: { fill: "white" }//for the empty space
            }
        ];
        const steps = [
            {
                key: 1,
                amount: 80,//multiply percentage by suggested steps to burn the extra calories
                svg: { fill: "#4c59c9" }//for the steps taken within budget
            },
            {
                key: 2,
                amount: 0,
                svg: { fill: "#558241" }//steps above
            },
            {
                key: 3,
                amount: 20,
                svg: { fill: "white" }//for the empty space
            }
        ];        

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1,
                    borderBottomColor: "#eae5e5", margingTop: 40, paddingTop: 16, backgroundColor: "#cfdef7"}}>
                    <Icon name="ios-arrow-back" size={20} onPress={this._decrementDate}></Icon>
                    <Icon name="ios-calendar" size={20} onPress={this._incrementDate}></Icon>
                    <Text style={{fontSize:14}}>{this.state.currentDate}</Text>
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
                {this._renderSection(nutrientData, colors, calColors, keys, barKeys, stepsColors, barData, pieData, calories, steps)}
            </SafeAreaView>
        );
    }
}