import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import EventForm from './EventForm';
import BarSearch from './BarSearch';
import EventsBar from './EventsBar';
import EventsList from './EventsList';
import NavBar from './NavBar';

class BarCrawl extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		
		this.showHomePage = this.showHomePage.bind(this);
		this.createEventForm = this.createEventForm.bind(this);
		this.showEvents = this.showEvents.bind(this);
		this.showSingleEvent = this.showSingleEvent.bind(this);
		this.searchBars = this.searchBars.bind(this);
		this.showSingleBar = this.showSingleBar.bind(this);


	}

	showHomePage(){

	}

	createEventForm(){

	}

	showEvents(){

	}

	showSingleEvent(){

	}

	searchBars(){

	}

	showSingleBar(){

	}

	render() {
		return (
			<div className="bar-crawl">
				<Route
					exact
					path="/"
					render={() => <Redirect to="/barcrawl" />}
				/>	
				<Route exact path="/barcrawl" render={this.showHomePage} />
				<Route exact path="/new" render={this.createEventForm} />
				<Route path="/barcrawl/events" render={this.showEvents} />
				<Route path="/barcrawl/events/:id" render={this.showSingleEvent} />
				<Route path="/barcrawl/barsearch" render={this.searchBars} />
				<Route path="/barcrawl/bar/:id" render={this.showSingleBar} />
			</div>
		);
	}
}

export default BarCrawl;
