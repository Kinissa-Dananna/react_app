import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import NavBar from './NavBar.js'

class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameOfEvent: '',
			description: '',
			address: '',
			time: '',
			submitted: false,
			submittedId: null
		};
		this.changeNameOfEvent = this.changeNameOfEvent.bind(this);
		this.changeDescription = this.changeDescription.bind(this);
		this.changeAddress = this.changeAddress.bind(this);
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

	changeAddress(event) {
		event.preventDefault();
		this.setState({ address: event.target.value });
	};

	changeTime(event) {
		event.preventDefault();
		this.setState({ time: event.target.value })
	};

	onSubmit(event) {
		event.preventDefault();
		const { nameOfEvent, description, address, time } = this.state;
		axios.post('http://localhost:8080/events',
			{ nameOfEvent, description, address, time })
			.then(response => {
				const { id } = response.data;
				this.props.history.push(`/events/${id}`); //probably need to change this.
			})
	};

	render() {
		if (this.state.submitted) {
			return <Redirect to={`/`} />
		}
		return (

				<div>
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
							Address:
            <input
								type='text'
								value={this.state.address}
								onChange={this.changeAddress}
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
