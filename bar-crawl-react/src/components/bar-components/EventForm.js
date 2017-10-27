import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import NavBar from './NavBar.js';

class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameOfEvent: '',
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

	changeNameOfEvent(event) {
		event.preventDefault();
		this.setState({ nameOfEvent: event.target.value });
	};

	changeDescription(event) {
		event.preventDefault();
		this.setState({ description: event.target.value });
	};

	changeTime(event) {
		event.preventDefault();
		this.setState({ time: event.target.value })
	};

	onSubmit(event) {
		console.log('submit clicked');
		event.preventDefault();
		const { nameOfEvent, description, time } = this.state;
		axios.post(`http://localhost:8080/events?auth_token=${this.props.user.token}`,
			{ nameOfEvent, description, time })
			.then(response => {
				console.log(response);
				const { id } = response.data;
				this.props.history.push(`/events/${id}`); //probably need to change this.
			})
	};

	render() {
		if (this.state.submitted) {
			return <Redirect to={`/`} />
		}
		return (

				<div className="event-form">
					<h3>New Event</h3>
					<form onSubmit={this.onSubmit}>
						<label>
							Name of Event:
          <input
								type='text'
								value={this.state.nameOfEvent}
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
								type='text'
								value={this.state.time}
								onChange={this.changeTime}
							/>
						</label>
						<br />
						<input type='submit' value='Submit' />
					</form>
				</div>

		);
	}

};

export default EventForm;
