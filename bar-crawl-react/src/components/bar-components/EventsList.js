import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar.js'
import EventCard from './EventCard';
import EventsBar from './EventsBar';
import axios from 'axios';

class EventsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		}
	}
	componentDidMount() {
		setTimeout(() => {
		axios.get('http://localhost:8080/api/events')
					.then(response => {
            console.log('response', response);
						this.setState({events: response.data.events})
					});
		}, 1000)

	}
	eventsItem({ownerId, name, description, time, id}, i){
		return(
			<li className="events-item" key={i.toString()}>
				<p> <Link to={`/events/${id}`}>{name}</Link></p>
				<p></p>
				<p></p>
				<p></p>
			</li>
			);
	}

	//function that maps over event cards and renders them in the page

	render() {
		const eventsItems = this.state.events.map(this.eventsItem);
		return(
			 <div className='events-list'>
			<ul>
				{eventsItems}
			</ul>
			</div>
			)
	}


}

export default EventsList;
