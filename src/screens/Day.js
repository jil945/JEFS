import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";

export default class Day extends React.Component {
constructor(props)
{
	super(props)
	this.state = {
		activeIndex: 0
		}
}
segmentClicked = (index) => {
	this.setState({
		activeIndex: index
		})
	}
	
	renderSection = () =>
	{
	if(this.state.activeIndex == 0)
	{
		return(
		<View>
			<Text> Calories</Text>
		</View>
		)
	}
	}
    render() {
        return (
			<View>
				<View style={{flexDirection: 'row', justifyContent:'space-around', borderBottomWidth:1,
				borderBottomColor: '#eae5e5'}}>
					<Button style={[this.state.activeIndex == 0? {} : {color:'grey'}]} 
					title="Calories" onPress={() => this.segmentClicked(0)} active={this.state.activeIndex == 0}>
					</Button>
					<Button style={[this.state.activeIndex == 1? {} : {color:'grey'}]} 
					title="Nutrients" onPress={() => this.segmentClicked(1)} active={this.state.activeIndex == 1}>
					</Button>
					<Button style={[this.state.activeIndex == 2? {} : {color:'grey'}]} 
					title="Steps" onPress={() => this.segmentClicked(2)} active={this.state.activeIndex == 2}>
					</Button>
				</View>
				{this.renderSection()}
			</View>
        );
    }
}