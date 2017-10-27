import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

class UserSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userOptions: [],
			userInput: '',
			dataLoaded: false
		};
		this.changeUserInput = this.changeUserInput.bind(this);
		this.autocompleteUser = this.autocompleteUser.bind(this);
		
	};

	// onChange function that sets state of userInput
	changeUserInput(event) {
		event.preventDefault();
		this.setState({ userInput: event.target.value }, this.autocompleteUser);
	};

	autocompleteUser() {
		const { userInput } = this.state;
		axios
			.get(`http://localhost:8080/user-search/${userInput}?auth_token=${this.props.user.token}`)
			.then(response => {
				console.log(response.data)
				this.state.userOptions.push(response.data);
				this.setState({dataLoaded: true })
			})
	};

	populateList() {
		const onClick = (user) => {
			const eventId = this.props.match.params.eventId;
			console.log(user)
			axios
				.post(`http://localhost:8080/events/${eventId}/newuser?auth_token=${this.props.user.token}`,
				{ eventId /*,user.userId*/})
		};
		if(this.state.dataLoaded === true) {
			console.log(this.state.userOptions)
		return this.state.userOptions.map((user, index) => {
			console.log(user);
			return <p onClick={onClick(user)} id={user.userId} key={index}>{user.userName}</p>;
		});
	}
	}

	render() {
		if (this.state.submitted) {
			return <Redirect to={`/`} />
		}
		return (

			<div>
				<h3>Add Users</h3>
				<form>
					<label>
						Search User by Name:
					</label>
    				<input
						type='text'
						value={this.state.userInput}
						onChange={this.changeUserInput}
					/>	
					<br />
					<div id="list">{this.populateList()}</div>
				</form>
			</div>

		);
	}

};

export default UserSearch;