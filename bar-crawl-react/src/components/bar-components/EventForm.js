import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar.js'

class EventForm extends Component {
	constructor(props) {
		super(props);
		// input values stored in state
		this.state = {'FILL IN'}
	}

	// onChange functions to change state for each input

	// function that creates onSubmit form 
	// to save event information to the database

	render() {
	    return (
	      <div className='event-form'>
	      <form onSubmit= 'FILL IN'>
	      'FILL IN'
	      </form>
	      </div>
	    );
	}

}

export default EventForm;