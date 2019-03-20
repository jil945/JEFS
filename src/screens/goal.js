import React from "react";
import { View, SafeAreaView, Text, Keyboard, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { LineChart, Grid, YAxis } from "react-native-svg-charts";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Input } from "react-native-elements";

import DateHeader from "./components/DateHeader";

import moment from "moment";
import http from "../util/http";
import Auth from "../util/auth";

const DATE_FORMAT = "YYYY-MM-DD";
export default class Goal extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-contact" color={tintColor} size={24}></Icon>
        )
    };

    constructor(props) {
        super(props);

        this.state = {
            currentDate: new moment(),
            isModalVisible: false,
            profileWeights: {},
            changedWeights: new Set(),
            userProfile: {},
            loading: false,
        };
    }

    _onChangeDate = (d) => {
        this.setState({ currentDate: d });
    }

    _key = () => {
        return this.state.currentDate.format(DATE_FORMAT);
    }

    _getWeight = () => {
        let k = this._key();
        if (this.state.profileWeights.hasOwnProperty(k)) {
            return this.state.profileWeights[k];
        }
        return "";
    }

    _onChangeWeight = (text) => {
        let w = text;
        let k = this._key();
        this.setState(state => {
            let pw = state.profileWeights;
            if (!pw.hasOwnProperty(k) || pw[k] !== w) {
                state.profileWeights[k] = w;
                state.changedWeights.add(k);
            }
            return state;
        });
    }

    _onSaveChanges = async () => {
        try {
            let h = parseFloat(this.state.userProfile.height);
            let weightDates = [];
            this.state.changedWeights.forEach(k => weightDates.push(k));

            await Promise.all(weightDates.map(k => {
                let w = parseFloat(this.state.profileWeights[k]);

                if (w > 0) {
                    return http.post(`profile?date=${encodeURIComponent(k)}`, {
                        weight: w,
                        height: h
                    }).catch(console.log);
                } else {
                    return Promise.resolve();
                }

            }));

            this._closeModal();
        } catch(e) {
            console.log(e);
        }
    }

    _openModal = () => {
        this.setState({ isModalVisible: true });
    }
    _closeModal = () => {
        this.setState({ isModalVisible: false });
    }
    _onModalHide = async () => {
        this.setState({ loading: true });
        try {
            let profileWeights = await this._fetchProfileWeights();
            this.setState({ profileWeights });
        } catch(e) {}
        this.setState({ loading: false });
    }

    _getGraphData = () => {
        let to = new moment();
        to.add(1, "days"); // need to offset it by one
        let from = new moment();
        from = from.subtract(7, "days");

        let defaultWeight = this.state.userProfile.weight;
        let profileWeights = this.state.profileWeights;

        let res = [];
        while (from < to) {
            let k = from.format(DATE_FORMAT);

            if (profileWeights.hasOwnProperty(k)) {
                let val = parseFloat(profileWeights[k]);
                res.push(val);
            } else {
                res.push(defaultWeight);
            }

            from = from.add(1, "days");
        }

        return res;
    }

    _fetchProfileWeights = async () => {
        // Fetch user weights from one week back
        let today = new moment();
        let to = today.format(DATE_FORMAT);
        today.subtract(7, "days");
        let from = today.format(DATE_FORMAT);

        let profileWeights = {};
        
        try {
            let resp = await http.get("profile", {
                params: { to, from }
            });
            for (let profile of resp.data.response) {
                let k = profile.timestamp;
                let w = profile.weight;
                if (!Number.isNaN(w)) {
                    w = w.toString();
                }
                profileWeights[k] = w;
            }
        } catch(e) {}


        return profileWeights;
    }

    componentWillMount = async () => {
        this.setState({ loading: true });
        try {
            let userProfile = await Auth.getUserProfileStorage();
            let profileWeights = await this._fetchProfileWeights();
            
            this.setState({ userProfile, profileWeights });
        } catch(e) {
            console.log(e);
        }

        this.setState({ loading: false });
    }

    _defaultRender() {
        const data = this._getGraphData();

        return (
            <SafeAreaView style={{ flex: 1 }}>

                <Modal hasBackdrop
                    isVisible={this.state.isModalVisible}
                    onModalHide={this._onModalHide}
                    onBackdropPress={this._closeModal}
                    swipeDirection="down"
                    onSwipeComplete={this._closeModal}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "space-between" }}>
                            <DateHeader value={this.state.currentDate}
                                onChange={this._onChangeDate}></DateHeader>
                            <View style={{ flex: 1 }}>
                                <Input label="Weight (kg)"
                                    keyboardType="numeric"
                                    value={this._getWeight()}
                                    onChangeText={this._onChangeWeight}></Input>
                            </View>
                            <View>
                                <Button title="Save Changes" 
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={this._onSaveChanges}></Button>
                                <Button title="Cancel" 
                                    style={{ padding: 10 }}
                                    onPress={this._closeModal}></Button>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

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
                        contentInset={{ top: 20, bottom: 20 }}>
                        <Grid/>
                    </LineChart>
                </View>
                <Button title="Update Your Weight" 
                    style = {{borderRadius:30, justifyContent: "center", alignItems: "center"}} 
                    onPress={this._openModal}></Button>
            </SafeAreaView>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
            );
        }
        return this._defaultRender();
    }
}