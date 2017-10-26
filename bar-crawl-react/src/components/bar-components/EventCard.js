import React, { Component } from "react";
// import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

class EventCard extends Component {
	constructor(props){
		super(props);
	}

	render(){

		return(
			<div className="event-card">
				{this.props.eventsItems}
			</div>
		);
	}
}

export default EventCard;
