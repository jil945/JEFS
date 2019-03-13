import React from "react";
import { View, SafeAreaView, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { PieChart, StackedBarChart, XAxis } from "react-native-svg-charts";
import PureChart from "react-native-pure-chart";
import DateHeader from "./components/DateHeader";

import moment from "moment";
import { PedometerTask } from "../util/tasks";

const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
            currentDate: new moment(),
            tabState: {}
        };
    }

    _tabs = () => [
        {
            key: "calo",
            title: "Calories",
            before: this._beforeRenderCalories,
            render: this._renderCalories
        },  {
            key: "nuti",
            title: "Nutrients",
            before: this._beforeRenderNutrients,
            render: this._renderNutrients
        }, {
            key: "step",
            title: "Steps",
            before: this._beforeRenderSteps,
            render: this._renderSteps
        }
    ];

    _onChangeDate = async (d) => {
        this.setState(state => {
            state.currentDate = d;
            return state;
        });

        // Update tab to match new date
        let _t = this;
        setTimeout(() => _t._segmentClicked(_t.state.activeIndex));
    }

    _segmentClicked = async (index) => {
        let key = this._tabs()[index].key;
        let beforeFn = this._tabs()[index].before;
        if (beforeFn) {
            await beforeFn(key);
        }

        this.setState(state => {
            state.activeIndex = index;
            return state;
        });
    }

    _beforeRenderCalories = async (key) => {
        // Do data fetching here

        // Store data needed for rendering
        this.setState(state => {
            state.tabState[key] = {
            };
            return state;
        });
    }

    _renderCalories = (key) => {
        let t = this.state.tabState[key]; // Access data from beforeRender

        const calColors = [ "#558241", "#f23a3a" ];
        const barKeys   = [ "within", "over" ];

        const barData = [ {day: "Sunday",
            within: 1400, over:0},{day: "Mon", within:2100, over:400},{day: "Tue",
            within: 1400, over:0},{day: "Wed", within:2100, over:400},{day: "Thu",
            within: 1400, over:0},{day: "Fri", within:2100, over:400},{day: "Sat", within:1000, over:200}];
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
    }

    _beforeRenderNutrients = async (key) => {
        // Do data fetching here

        // Store data needed for rendering
        this.setState(state => {
            state.tabState[key] = {
            };
            return state;
        });
    }

    _renderNutrients = (key) => {
        let t = this.state.tabState[key]; // Access data from beforeRender

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
        const keys   = [ "fat", "carb", "protein" ];
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
    }

    _beforeRenderSteps = async (key) => {
        let steps = await PedometerTask.getWeeklySteps(this.state.currentDate.toDate());

        let dailyGoal = 5000; // Recommended to take 5000 steps per day

        let barData = steps.map(({steps, day}) => {
            let dayTitle = WEEK[day.getDay()];
            return {
                day: dayTitle,
                within: steps > dailyGoal ? dailyGoal : steps,
                over: steps > dailyGoal ? steps - dailyGoal : 0
            };
        });
        barData.reverse();


        let currSteps = steps[0].steps;
        //steps above
        let overflow = (currSteps > dailyGoal) ? (currSteps - dailyGoal) / dailyGoal : 0;
        // steps below
        let underflow = (currSteps < dailyGoal) ? (dailyGoal - currSteps) / dailyGoal : 0;

        let pieData = [{
            key: 1,
            amount: overflow,
            svg: { fill: "#558241" }
        }, {
            key: 2,
            amount: currSteps / dailyGoal,
            svg: { fill: "#4c59c9" } // for the steps taken within budget
        }, {
            key: 3,
            amount: underflow,
            svg: { fill: "white" } //for the empty space

        }];

        this.setState(state => {
            state.tabState[key] = {
                barData,
                pieData,
                currSteps
            };
            return state;
        });
    }
    _renderSteps = (key) => {
        let t = this.state.tabState[key];
        let pieData = t.pieData;
        let currSteps = t.currSteps;
        
        let barData = t.barData;
        const barKeys = [ "within", "over" ];
        const stepsColors = ["#4c59c9", "#558241"];

        return (
            <View style={{ flex: 1, marginTop: 20}}>
                <PieChart
                    style={{ height: 200 }}
                    valueAccessor={({ item }) => item.amount}
                    data={pieData}
                    spacing={0}
                    outerRadius={"95%"}>
                </PieChart>
                <Text style={{ marginTop: -100, marginBottom: 100, 
                    justifyContent: "center", alignItems: "center", position: "relative", textAlign: "center"}}>
                    {currSteps}
                </Text>

                <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1, borderBottomColor: "#eae5e5", marginTop:16}}>
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
    }

    render() {
        const t = this._tabs()[this.state.activeIndex];

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <DateHeader value={this.state.currentDate}
                    onChange={this._onChangeDate}></DateHeader>
                <View style={{flexDirection: "row", justifyContent:"space-around", borderBottomWidth:1, borderBottomColor: "#eae5e5"}}>
                    { this._tabs().map((tab, idx) => (
                        <Button style={[ this.state.activeIndex === idx ? {} : { color: "grey" } ]}
                            title={tab.title} 
                            key={tab.key}
                            onPress={() => this._segmentClicked(idx)}></Button>
                    ))}
                </View>
                { t.render(t.key) }
            </SafeAreaView>
        );
    }
}