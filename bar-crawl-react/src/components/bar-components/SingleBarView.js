import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar.js';
import map from './map.js'
import axios from 'axios'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class SingleBarView extends Component {
	constructor(props){
		super(props);
		this.state ={
			barInfo: [],
		}

		this.currentStatus = this.currentStatus.bind(this);
	}

	// function that gets information from localhost for a single bar
	componentDidMount(){
		 axios
		    .get(`http://localhost:8080/bars/${this.props.match.params.id}`)
		    .then(response => {
		      this.setState({ barInfo: response.data});
	    });
	}

	// function that formats open status based on current time and hours
	currentStatus(){
		if(this.state.barInfo.isOpen){
			return(<p>Open Now</p>)
		}else{
			return(<p>Closed Now</p>)
		}
	}

	// Formatted information for a single bar
	render(){
		const { name, address, price, rating, isOpen, daysOpen, hoursOpen, hoursUntilClosed, description, lat, long} = this.state.barInfo;
		

		return(
			<div className="single-bar">
				<div><map isMarkerShown={true} lat={lat} long={long}/></div>
				<p>{name}</p>
				<p>{this.currentStatus()}</p>
				{{isOpen} && 
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
