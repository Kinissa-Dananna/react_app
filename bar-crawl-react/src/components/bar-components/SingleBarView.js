import React, { Component } from "react";
// import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
// import NavBar from './NavBar.js';
import map from './map.js';
import Iframe from 'react-iframe';
import axios from 'axios';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class SingleBarView extends Component {
	constructor(props){
		super(props);
		this.state ={
			barInfo: [],
			haveData: false
		}

		this.currentStatus = this.currentStatus.bind(this);
	}

	// function that gets information from localhost for a single bar
	componentDidMount(){
		const eventId = this.props.match.params.eventId;
		console.log(eventId);
		const id = this.props.match.params.id;
		console.log(id);
		 axios
		    .get(`http://localhost:8080/bars/${eventId}/${id}`)
		    .then(response => {
					console.log('response', response)
		      this.setState({
						barInfo: response.data,
						haveData: true
					});
	    });
	}

	// function that formats open status based on current time and hours
	currentStatus(){
		if(this.state.barInfo.isOpen){
			return('Open Now')
		}else{
			return('Closed Now')
		}
	}

	// Formatted information for a single bar
	render(){
		const { name, address, price, rating, isOpen, daysOpen, hoursOpen, hoursUntilClosed, description, lat, long } = this.state.barInfo;
		 const url = `http://www.google.com/maps/@${lat},${long},16z&output=embed`;
		return(
			<div className="single-bar">
				<div className="map">
					<Iframe url= {url}
					position="absolute"
					width="100%"
					height="100%"
					styles={{height: "25px"}}
					allowFullScreen/>
				</div>
				<h2>{name}</h2>
				<p>{this.currentStatus()}</p>
				{{isOpen} &&
					<p>{hoursUntilClosed}</p>
				}
				{/* <p>Address:{address.street},{address.city}</p> */}
				<p>Price Range: {price}</p>
				<p>Rating: {rating}/10</p>
				<p>Hours: {daysOpen} {hoursOpen}</p>
				<p>Description: {description}</p>
			</div>
		);
	}
}

export default SingleBarView;
