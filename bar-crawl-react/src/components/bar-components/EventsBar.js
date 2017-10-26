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
	componentDidMount() {
		axios.get('http://localhost:8080/events/owned')
					.then(response => {
            console.log('response', response);
						this.setState({events: response.data})
					});
	}
	eventsItem({ownerId, name, description, time, id}, i){
		return(
			<li className="events-item" key={i.toString()}>
				<p> <Link to={`/events/${id}`}>{name}</Link></p>
			</li>
			);
	}

	//function that maps over event cards and renders them in the page

	render() {
		const eventsItems = this.state.events.map(this.eventsItem);
		return(
			 <div className='sidebar'>
			<ul>
				 {eventsItems}

			</ul>
			</div>
			)
	}


}

export default EventBar;
