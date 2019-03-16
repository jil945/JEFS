import React from "react";
import { View, SafeAreaView, Text } from "react-native";
import { LineChart, Grid, YAxis } from "react-native-svg-charts";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-elements";


export default class Goal extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-contact" color={tintColor} size={24}></Icon>
        )
    };

    _updateWeight = () => {
        this.props.navigation.navigate("Profile");
    }
    render() {
        const data = [ 122, 125, 131, 129, 126, 128, 125, 121 ];

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={{fontSize:24, fontWeight:"700", paddingHorizontal: 20, paddingTop: 60}}>
					Weight Loss
                </Text>
                <View style={{ height: 200, flexDirection: "row", marginLeft: 40 }}>
                    <YAxis
                        data={ data }
                        contentInset={ { top: 20, bottom: 20 } }
                        svg={{
                            fill: "grey",
                            fontSize: 10,
                        }}
                        numberOfTicks={ 10 }
                        formatLabel={ value => value }
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={ data }
                        svg={{ stroke: "rgb(212, 227, 252)" , strokeWidth: 2}}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid/>
                    </LineChart>
                </View>
                <Button title="Update Your Weight" style = {{borderRadius:30, justifyContent: "center", alignItems: "center"}} onPress={this._updateWeight}></Button>
            </SafeAreaView>
        );
    }
}