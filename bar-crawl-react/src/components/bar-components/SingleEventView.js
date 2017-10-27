<<<<<<< HEAD
import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserSearch from './UserSearch.js';
=======
import React, {Component} from "react";
import {Link} from "react-router-dom";
// import EventsBar from './EventsBar.js';
>>>>>>> 4ffb9b1e68c52d58cdb281d550493090d6cb6073
import axios from 'axios';

class SingleEventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      bars:[],
      attendees:[],
			deleted: false
      bars: [],
      attendees: []
    }
		this.deleteEvent = this.deleteEvent.bind(this);
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
	deleteEvent(id){
		//event.preventDefault();
		//const eventId = Number(this.props.match.params.id);
		console.log(id);
		axios.delete(`/events/${id}?auth_token=${this.props.user.token}`);
		this.setState({deleted: true});
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
		const attendees = this.state.attendees.map((user, i) => {
			console.log(user)
			console.log(user.image);
				return <img src={user.image} key={i} />
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
					<div className="attendees">{attendees}</div>
					<Link to={`/events/${eventId}/user-search`} {...this.props} >Add Users </Link>
				</div>

				<button onClick={() => this.deleteEvent(eventId)} > Delete This Event </button>
			</div>
		);
	}

}

export default SingleEventView;
