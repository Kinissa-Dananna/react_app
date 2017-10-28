import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

class EventBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		}
	}

	// function that gets event information from the database
	componentDidMount() {
		axios
			.get(`http://localhost:8080/events/owned?auth_token=${this.props.user.token}`)
			.then(response => {
				this.setState({events: response.data})
			});
	}

	// function that formats event information into 
	// list items with links to that event
	eventsItem({ownerId, name, description, time, id}, i){
		return(
			<li className="events-item" key={i.toString()}>
				<p> <Link to={`/events/${id}`}>{name}</Link></p>
			</li>
			);
	}

	// function that maps over all the event list items 
	// and renders them formated into a list on the page
	render() {
		const eventsItems = this.state.events.map(this.eventsItem);
		return(
			 <div className='sidebar'>
			 <h4>Events</h4>
			<ul>
				 {eventsItems}

			</ul>
			</div>
		)
	}


}

export default EventBar;
