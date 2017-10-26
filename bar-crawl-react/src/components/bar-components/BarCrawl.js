import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import CreateEventForm from './EventForm';
import NavBar from './NavBar.js';
import BarSearch from './BarSearch';
import EventCard from './EventCard';
import EventsBar from './EventsBar';
import SingleBarView from './SingleBarView';
import ShowEvents from './EventsList';
import SingleEventView from './SingleEventView';

class BarCrawl extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		//
		// this.showHomePage = this.showHomePage.bind(this);
		// this.createEventForm = this.createEventForm.bind(this);
		// this.showEvents = this.showEvents.bind(this);
		// this.showSingleEvent = this.showSingleEvent.bind(this);
		// this.searchBars = this.searchBars.bind(this);
		// this.showSingleBar = this.showSingleBar.bind(this);

	}

	render() {
		return (
			<div className="bar-crawl">
				<NavBar logout={this.props.logout} />
				<EventsBar />
				<Switch>
				<Route
					exact
					path="/"
					render={() => <Redirect to="/events" />}
				/>
				<Route exact path="/events/new" render={props => (
					<CreateEventForm />
					)} />
				<Route path="/events" render={props => (
					<ShowEvents
					 	{...props}
							/>
						)} />
				<Route path="/events/:id" render={props => (
					<SingleEventView
					{...props}
				 		/>
					)} />
				<Route path="/events/:eventId/addBar" render={props => (
					<BarSearch
						{...props}
					 	/>
					)} />
				<Route path="/event/:eventId/bars/:id" render={props => (
					<SingleBarView
						{...props}
						/>
						)}
					/>
			</Switch>
			</div>
		);
	}
}

export default BarCrawl;
