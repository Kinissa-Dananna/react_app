import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar.js'

class SingleBarView extends Component {
	constructor(props){
		super(props);
		this.state ={
			barInfo: [],
			currentStatus: 'open'
		}

		this.currentStatus = this.currentStatus.bind(this);
	}

	// function that gets information from localhost for a single bar
	componentDidMount(){
		 axios
		    .get(`http://localhost:8080/bars/${this.props.match.params.id}`)
		    .then(response => {
		      this.setState({ barInfo: response.data/*.'FILL IN'*/});
	    });
	}

	// function that formats open status based on current time and hours
	curentStatus(){
			'FILL IN'
	}

	// Formatted information for a single bar
	render(){
		const { name, address, price, rating, daysOpen, hoursOpen, hoursUntilClosed, description = this.state.barInfo;

		return(
			<div className="single-bar">
				<div>MAP 'FILL IN'</div>
				<p>{name}</p>
				<p>OPEN STATUS 'FILL IN'</p>
				{this.state.currentStatus===open && 
					<p>{hoursUntilClosed}</p>
				}
				<p>Address:{address.street},{address.city}</p>
				<p>Price Range: {price}</p>
				<p>Rating: {rating}/10</p>
				<p>Hours: {daysOpen} {hoursOpen}</p>
				<p>Description: {description}</p>
			</div>
		);
	}
}

export default SingleBarView;
