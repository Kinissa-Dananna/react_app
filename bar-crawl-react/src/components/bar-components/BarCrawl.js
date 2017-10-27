import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import CreateEventForm from './EventForm';
import NavBar from './NavBar.js';
import BarSearch from './BarSearch';
import EventBarSearch from './EventBarSearch';
import EventCard from './EventCard';
import EventsBar from './EventsBar';
import SingleBarView from './SingleBarView';
import SingleBarSearched from './SingleBarSearched'
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
				<EventsBar user={this.props.user}/>
				<Switch>
				<Route
					exact
					path="/"
					render={() => <Redirect to="/events" />}
				/>
				<Route exact path="/events/new" render={props => (
					<CreateEventForm
						{...props} {...this.props} />
					)} />
				<Route exact path="/events" render={props => (
					<ShowEvents
					 	{...props}  {...this.props}
							/>
						)} />
				<Route exact path="/events/:id" render={props => (
					<SingleEventView
					{...props} {...this.props}

				 		/>
					)} />
				<Route exact path="/events/:eventId/addBar" render={props => (
					<EventBarSearch
						{...props} {...this.props}
					 	/>
					)} />
					<Route exact path="/bars/search" render={props => (
						<BarSearch
							{...props} {...this.props}
						 	/>
						)} />
						<Route exact path="/bars/search/:barId" render={props => (
							<SingleBarSearched
								{...props} {...this.props}
							 	/>
							)} />
				<Route exact path="/event/:eventId/bars/:id" render={props => (
					<SingleBarView
						{...props} {...this.props}
						/>
						)}
					/>
			</Switch>
			</div>
		);
	}
}

export default BarCrawl;
