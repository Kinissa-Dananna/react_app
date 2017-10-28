import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import UserSearch from './UserSearch.js';
import axios from 'axios';

class SingleEventView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: [],
			bars: [],
			attendees: [],
			deleted: false
		}
		this.deleteEvent = this.deleteEvent.bind(this);
	}

	// function that gets information from the database for a single event
	componentDidMount() {
		const eventId = this.props.match.params.id;
		axios
			.get(`http://localhost:8080/events/${eventId}?auth_token=${this.props.user.token}`)
			.then(response => {
				this.setState({
					event: response.data,
					bars: response.data.bars,
					attendees: response.data.attendees
				})
			});
	}

	componentDidUpdate(prevProps, newProps) {
		const eventId = this.props.match.params.id;
		if (eventId !== prevProps.match.params.id) {
		axios
			.get(`http://localhost:8080/events/${eventId}?auth_token=${this.props.user.token}`)
			.then(response => {
				this.setState({
					event: response.data,
					bars: response.data.bars,
					attendees: response.data.attendees
				})
			});
		}
	}

	deleteEvent() {
		console.log('delete click')
		const id = this.state.event.id;
		console.log('id', id);
		axios.delete(`http://localhost:8080/events/${id}?auth_token=${this.props.user.token}`,
			{ id })
			.then(res => {
				console.log(res);
				this.setState({ deleted: true });
				this.props.history.push(`/events`);
			})
	}

	// Formatted information for a single event
	render() {
		const { name, description, time } = this.state.event;
		const eventId = this.props.match.params.id;
		const bars = this.state.bars.map((bar) => {

			return (
				<Link to={`/events/${eventId}/bars/${bar.id}`} >{bar.name}<br /></Link>
			)
		})
		const attendees = this.state.attendees.map((user, i) => {
			console.log(user)
			console.log(user.image);
			return <img src={user.image} key={i} />
		})

		if (this.state.deleted) {
			return <Redirect to={'/events'} />
		}

		return (
			<div className="single-event">
				<div className="event-info">
					<h2>{name}</h2>
					<h4>Description:</h4>
					<p>{description}</p>
					<h4>Start Time:</h4>
					<p>{time}</p>
					<button onClick={() => this.deleteEvent(eventId)} > Delete This Event </button>
				</div>
				<div className="bar-info">
					<h4>Bars:</h4>
					<p>{bars}</p>
					<Link to={`/events/${eventId}/addBar`} {...this.props} ><button>Add Bars</button> </Link>
				</div>
				<div className="attendees-info">
					<h4>Attending:</h4>
					<div className="attendees">{attendees}</div>
					<Link to={`/events/${eventId}/user-search`} {...this.props} ><button>Add Users</button> </Link>
				</div>
			</div>
		);
	}

}

export default SingleEventView;
