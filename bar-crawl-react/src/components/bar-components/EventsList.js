import React, { Component } from "react";
import { Link } from "react-router-dom";
import EventCard from './EventCard';
// import EventsBar from './EventsBar';
import axios from 'axios';

class EventsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		}
	}
	componentDidMount() {
		axios.get(`http://localhost:8080/events/owned?auth_token=${this.props.user.token}`)
					.then(response => {
            console.log('response', response);
						this.setState({events: response.data})
					});
	}
	eventsItem({ownerId, name, description, time, id}, i){
		return(
			<Link to={`/events/${id}`}>
			<li className="events-item" key={i.toString()}>
				<h4> {name}</h4>
				<p>{description}</p>
				<p>{time}</p>
			</li></Link>
			);
	}

	//function that maps over event cards and renders them in the page

	render() {
		const eventsItems = this.state.events.map(this.eventsItem);
		return(
			 <div className='events-list'>
			<ul>
				{/* {eventsItems} */}
				<EventCard eventsItems={eventsItems} />
			</ul>
			</div>
			)
	}


}

export default EventsList;
