import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CreateEventForm from './EventForm.js';
import NavBar from './NavBar.js';
import BarSearch from './BarSearch.js';
import EventBarSearch from './EventBarSearch.js';
// import EventCard from './EventCard.js';
// import EventsBar from './EventsBar.js';
import SingleBarView from './SingleBarView.js';
import SingleBarSearched from './SingleBarSearched.js';
import SingleEventView from './SingleEventView.js';
import UserSearch from './UserSearch.js';
import UserDelete from './UserDelete.js';
import EventsList from './EventsList.js';
import EventEdit from './EventEdit.js'
import foursquare from '../../images/foursquare.png'

class BarCrawl extends Component {
	constructor(props) {
		super(props);
		this.state = {};

	}
	// creates routes to each page in the app using react router
	render() {
		return (
			<div className="bar-crawl">
				<NavBar logout={this.props.logout} />
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
					<EventsList
					 	{...props}  {...this.props}
							/>
						)} />
				<Route exact path="/events/:id" render={props => (
					<SingleEventView
					{...props} {...this.props}
				 		/>
					)} />
				<Route exact path="/events/:eventId/addBar/" render={props => (
					<EventBarSearch
						{...props} {...this.props}
					 	/>
					)} />
					<Route exact path="/events/:eventId/addBar/:barId" render={props => (
						<SingleBarSearched
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
				<Route exact path="/events/:eventId/bars/:id" render={props => (
					<SingleBarView
						{...props} {...this.props}
						/>
						)}
					/>
					<Route exact path="/events/:eventId/addBar" render={props => (
						<BarSearch
							{...props} {...this.props}
						 	/>
						)} />
					<Route exact path="/events/:eventId/user-search" render={props => (
						<UserSearch
							{...props} {...this.props}
						 	/>
						)} />
					<Route exact path="/events/:eventId/user-delete" render={props => (
						<UserDelete
							{...props} {...this.props}
						 	/>
						)} />
					<Route exact path="/events/:id/edit" render={props => (
						<EventEdit
							{...props} {...this.props}
						 	/>
						)} />
			</Switch>
			<img className='foursquare-logo' src={foursquare} alt="foursquare"/>
			</div>
		);
	}
}

export default BarCrawl;
