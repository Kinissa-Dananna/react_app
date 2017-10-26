import React, { Component } from "react";
// import { Link, Redirect } from "react-router-dom";
// import EventsBar from './EventsBar.js';
import axios from 'axios';

class SingleEventView extends Component {
	constructor(props) {
    super(props);
    this.state = {
      event: [],
      bars:[],
      attendees:[],
    }
  }

	// function that gets information from the database for a single event
  	componentDidMount() {
			console.log(this.props.match);
	    const eventId = this.props.match.params.id;
			console.log(eventId);
		setTimeout(() => {
		  	axios
			  	.get(`http://localhost:8080/events/${eventId}`)
			    .then(response => {
						console.log(response.data.bars)
		        	this.setState({
								event: response.data,
								bars: response.data.bars,
								attendees: response.data.attendees
							})
		        });
			}, 1000)
		}


	// Formatted information for a single event
	render(){
		const { name, description, time } = this.state.event;
		const bars = this.state.bars.map((bar) => {
			console.log(bar.name);
				return <p>{bar.name}</p>
			})
		const attendees = this.state.attendees.map((user) => {
			console.log(user.name);
				return <p>{user.name}</p>
			})
		return(
			<div className="single-event">
				<div className="event-info">
					<h2>{name}</h2>
					<h4>Description:</h4>
					<p>{description}</p>
					<h4>Start Time:</h4>
					<p>{time}</p>
				</div>
				<div className="bar-info">
					<h4>Bars:</h4>
					<p>{bars}</p>
				</div>
				<div className="attendees-info">
					<h4>Attending:</h4>
					<p>{attendees}</p>
				</div>
			</div>
		);
	}
}

export default SingleEventView;
