import React, { Component } from "react";
// import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
// import NavBar from './NavBar.js';
// import map from './map.js';
// import Iframe from 'react-iframe';
import axios from 'axios';
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import EventsBar from './EventsBar';


class SingleBarView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			barInfo: [],
			haveData: false,
			deleted: false,
			bars: []
		}

		this.currentStatus = this.currentStatus.bind(this);
		this.deleteBar = this.deleteBar.bind(this);
	}


		// function that gets data from database for a single bar
	componentDidMount() {
		const eventId = this.props.match.params.eventId;
		console.log(eventId);
		const id = this.props.match.params.id;
		console.log(id);
		axios

			.get(`http://localhost:8080/bars/${eventId}/${id}?auth_token=${this.props.user.token}`)
			.then(response => {
				//console.log('response', response)
				this.setState({
					barInfo: response.data,
					haveData: true
				});
			});
	}

	// function that deletes bar from an event
	deleteBar() {
		console.log('delete click')
		// const id = this.state.event.id;
		const eventId = this.props.match.params.eventId;
		const barId = this.props.match.params.id;
		console.log('eventId', eventId);
		console.log('barid',barId);
		// console.log('id', id);
		axios.delete(`http://localhost:8080/bars/${eventId}/${barId}?auth_token=${this.props.user.token}`,
			{ eventId, barId })
			.then(res => {
				console.log(res);
				this.setState({ deleted: true });
				this.props.history.push(`/events/${eventId}`);
			})
	}

	// function that formats open status based on current time and hours
	currentStatus() {
		if (this.state.barInfo.isOpen) {
			return ('Open Now')
		} else {
			return ('Closed Now')
		}
	}

	// Formatted information for a single bar
	render() {
		console.log('in single bar view');
		if (!this.state.haveData) {
			return <h2>Waiting for Data to Load</h2>
		}
		else {
			const { name, address, price, rating, isOpen, daysOpen, hoursOpen, hoursUntilClosed, description, lat, long, map, barId } = this.state.barInfo;
			//const map = this.state.map;
			console.log('map', map);
			return (
				<main>
				<div className="single-bar">
					<div className="map">
						<iframe
							width="400"
							height="500"
							src={map} >
						</iframe>
						{/* <img src={map} alt="map" /> */}
					</div>
					<div className="bar-info">
						<h2>{name}</h2>
						<p>{address.street}</p>
						<p>{address.city}</p>
						<p className="bar-status">{this.currentStatus()}</p>
						{{ isOpen } &&
							<p className="align-left">{hoursUntilClosed}</p>
						}
						{/* <p>Address:{address.street},{address.city}</p> */}
						<p className="align-left">Price Range: {price}</p>
						<p className="align-left">Rating: {rating}/10</p>
						<p className="align-left">Hours: {daysOpen} {hoursOpen}</p>
						<p className="align-left">Description: {description}</p>
						<button onClick={() => this.deleteBar(barId)} > Remove This Bar From This Event</button>
					</div>
				</div>
				<EventsBar {...this.props} />
			</main>
			)
		}
	}
}

export default SingleBarView;
