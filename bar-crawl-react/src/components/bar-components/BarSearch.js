import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar.js'

class BarSearch extends Component {
	constructor(props){
		super(props);
		this.state ={}
	}

	// onChange function that sets location input in the state

	// onChange function that sets bar name input in the state

	// function that gets autocomplete location options 
	// from localhost based on the inputs

	// onClick function that saves an location option from the drop down list

	// function that gets autocomplete bar options 
	// from localHost based on the saved location

	// onClick function that shows the single bar view option
	// for a selected bar from the drop down list


	render(){

		return(
			<div className="bar-search">
						
			</div>
		);
	}
}

export default BarSearch;