import React, { Component } from "react";
import { Link } from "react-router-dom";
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
			//console.log(this.props.match);
	    const eventId = this.props.match.params.id;
			//console.log(eventId);
		  	axios
			  	.get(`http://localhost:8080/events/${eventId}?auth_token=${this.props.user.token}`)
			    .then(response => {
						//console.log(response.data.bars)
		        	this.setState({
								event: response.data,
								bars: response.data.bars,
								attendees: response.data.attendees
							})
		        });
		}


	// Formatted information for a single event
	render(){
		const { name, description, time } = this.state.event;
		const eventId = this.props.match.params.id;
		const bars = this.state.bars.map((bar) => {
			//console.log(bar.name);
				return (
					<Link to={`/events/${eventId}/bars/${bar.id}`} >{bar.name}<br /></Link>
				)
			})
		const attendees = this.state.attendees.map((user, key) => {
			console.log(user.name);
				return <p id={key} >{user.name}</p>
			})
		return(
			<div className="single-event">
				<div className="event-info">
					<h2>{name}</h2>
					<h4>Description:</h4>
					<p>{description}</p>
					<h4>Start Time:</h4>
					<p>{time}</p>
					{(this.state.event.ownerid === Number(this.props.user.id)) && <Link to={`/events/${this.props.match.params.id}/addBar`}>Add another bar</Link>}
				</div>
				<div className="bar-info">
					<h4>Bars:</h4>
					<div>{bars}</div>
				</div>
				<div className="attendees-info">
					<h4>Attending:</h4>
					<div>{attendees}</div>
				</div>
			</div>
		);
	}
}

export default SingleEventView;
