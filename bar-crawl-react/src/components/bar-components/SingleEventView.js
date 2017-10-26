import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar.js'
import EventsBar from './EventsBar.js'

class SingleEventView extends Component {
	constructor(props){
		super(props);
		this.state ={}
	}

	// function that gets information from the database for a single event

	// function that formats information for a single event

	render(){

		return(
			<div className="single-event">
						
			</div>
		);
	}
}

export default SingleEventView;