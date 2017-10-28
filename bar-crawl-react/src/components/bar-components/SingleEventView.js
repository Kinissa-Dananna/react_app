import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
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
		this.redirectPage = this.redirectPage.bind(this);
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
			//console.log(bar.name);
			return (
				<Link to={`/events/${eventId}/bars/${bar.id}`} >{bar.name}<br /></Link>
			)
		})
		const attendees = this.state.attendees.map((user, key) => {
			console.log(user.name);
			return <p id={key} >{user.name}</p>
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
				</div>
				<div className="bar-info">
					<h4>Bars:</h4>
					<p>{bars}</p>
				</div>
				<div className="attendees-info">
					<h4>Attending:</h4>
					<p>{attendees}</p>
				</div>

				<button onClick={() => this.deleteEvent(eventId)} > Delete This Event </button>
			</div>
		);
	}
}

export default SingleEventView;
