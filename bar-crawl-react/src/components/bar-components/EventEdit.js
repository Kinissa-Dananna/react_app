import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import NavBar from './NavBar.js';
import EventsBar from './EventsBar';

class EventEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			time: '',
			submitted: false,
			submittedId: null
		};
		this.changeNameOfEvent = this.changeNameOfEvent.bind(this);
		this.changeDescription = this.changeDescription.bind(this);
		this.changeTime = this.changeTime.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	};

	// onChange function that updates the input value
	// of the name of the event
	changeNameOfEvent(event) {
		event.preventDefault();
		this.setState({ name: event.target.value });
	};

	// onChange function that updates the input value
	// of the description of the event
	changeDescription(event) {
		event.preventDefault();
		this.setState({ description: event.target.value });
	};

	// onChange function that updates the input value
	// of the time of the event
	changeTime(event) {
		event.preventDefault();
		this.setState({ time: event.target.value })
	};

	// onSubmit function that saves the input
	// values to the database to update the event
	onSubmit(event) {
		const id = this.props.match.params.id;
		console.log('submit clicked');
		event.preventDefault();
		const { name, description, time } = this.state;
		console.log({name, description, time, id})
		axios
			.put(`http://barcrawlapi.herokuapp.com/events/${id}?auth_token=${this.props.user.token}`,
			{ name, description, time })
			.then(response => {
				console.log(response)
				this.setState({submitted:true})
			})
	};

	// function that renders a form toupdate this event and
	// redirect to all events when the updated event is submitted
	render() {
		if (this.state.submitted) {
			return <Redirect to={`/events/${this.props.match.params.id}`} />
		}
		return (
			<main>
				<div className="event-form">
					<h3>Edit Event</h3>
					<form onSubmit={this.onSubmit}>
						<label>
							Name of Event:
          <input
								type='text'
								value={this.state.name}
								onChange={this.changeNameOfEvent}
							/>
						</label>
						<br />
						<label>
							Description:
          <input
								type='text'
								value={this.state.description}
								onChange={this.changeDescription}
							/>
						</label>
						<br />
						<label>
							Time:
            <input
								type='datetime-local'
								value={this.state.time}
								onChange={this.changeTime}
							/>
						</label>
						<br />
						<input type='submit' value='Submit' />
					</form>
				</div>
				<EventsBar {...this.props} />
			</main>
		);
	}

};

export default EventEdit;
