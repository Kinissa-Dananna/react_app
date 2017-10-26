EventEdit.jsimport React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import BarSearch from './BarSearch';
import EventsBar from './EventsBar';

class EventEdit extends Component {
	constructor(props) {
		super(props);
		// input values stored in state
		this.state = {'FILL IN'}
	}

	// onChange functions to change state for each input

	// function that creates onSubmit form to edit information in an event

	render() {
	    return (
	      <div className='event-edit'>
	      <form onSubmit= 'FILL IN'>
	      'FILL IN'
	      </form>
	      </div>
	    );
	}

}

export default EventEdit;
