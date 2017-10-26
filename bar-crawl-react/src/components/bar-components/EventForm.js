import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import NavBar from './NavBar.js'

class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameOfEvent: '',
			nameOfBar: '',
			address: '',
			time: '',
			submitted: false,
			submittedId: null
		};
		this.changeNameOfEvent = this.changeNameOfEvent.bind(this);
		this.changeNameOfBar = this.changeNameOfBar.bind(this);
		this.changeAddress = this.changeAddress.bind(this);
		this.changeTime = this.changeTime.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	};

	changeNameOfEvent(event) {
		event.preventDefault();
		this.setState({ nameOfEvent: event.target.value });
	};

	changeNameOfBar(event) {
		event.preventDefault();
		this.setState({ nameOfBar: event.target.value });
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
		const { nameOfEvent, nameOfBar, address, time } = this.state;
		axios.post('http://localhost:8080/api',
			{ nameOfEvent, nameOfBar, address, time })
			.then(response => {
				const { id } = response.data;
				this.props.history.push(`/api/${id}`); //probably need to change this.
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
							Name Of Event:
          <input
								type='text'
								value={this.state.nameOfEvent}
								onChange={this.changeNameOfEvent}
							/>
						</label>
						<br />
						<label>
							Name Of Bar:
          <input
								type='text'
								value={this.state.nameOfBar}
								onChange={this.changeNameOfBar}
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
