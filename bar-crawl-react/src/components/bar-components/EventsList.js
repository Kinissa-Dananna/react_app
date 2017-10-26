import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar.js'
import EventCard from './EventCard';
import EventsBar from './EventsBar';

class EventsList extends Component {
	constructor(props) {
		super(props);
	}

	//function that maps over event cards and renders them in the page

	render() {
	    return (
	     <div className='events-list'>
	     </div>
	    );
	}


}

export default EventsList;
