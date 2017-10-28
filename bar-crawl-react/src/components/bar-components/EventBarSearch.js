import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar.js';
import SearchForm from './SearchForm';
import Autocomplete from './Autocomplete';
import axios from 'axios';
import EventsBar from './EventsBar';

// component for searching for bars after clicking 'add bar' on an event page
class EventBarSearch extends Component {
  	constructor(props){
		super(props);
		this.state ={
      		eventId: null,
			locationResults: [],
			barResults: [],
			currentLocation: ''
		} 

		this.getLocationResults = this.getLocationResults.bind(this);
		this.getBarResults = this.getBarResults.bind(this);
	    this.searchNearby = this.searchNearby.bind(this);
	    this.searchWithInput = this.searchWithInput.bind(this);
	    this.searchLocations = this.searchLocations.bind(this);
	}

	// function that updates eventId based on params
  	componentDidMount(){
		this.setState({ eventId: this.props.match.params.eventId});
	}

	// populate autofilled search results for a location 
	// from localhost based on current input
	getLocationResults(input) {
		console.log(input.length);
		if (input.length === 0) {
			this.setState({
				locationResults: []
			});
		} else {
			axios
			.get(`http://localhost:8080/search/${input}?auth_token=${this.props.user.token}`)
			.then(response => {
				this.setState({
					locationResults: response.data.results
				});
			})
		}
	}

	// populate autofilled search results for bars 
	// from localhost based on chosen location
	searchLocations(input) {
		console.log(input.length);
			axios.get(`http://localhost:8080/search/nearby/${input}?auth_token=${this.props.user.token}`).then(response => {
				console.log(response.data.searchLocation.description);
				this.setState({
					currentLocation: response.data.searchLocation.description,
					barResults: response.data.results,
					locationResults: []
				});
			})
		}

	// populate autofilled search results for bars 
	// from localhost based on name input
	getBarResults(input) {
		if (input.length === 0) {
			this.setState({
				results: []
			});
		} else {
			axios
			.get(`http://localhost:8080/search/${input}?auth_token=${this.props.user.token}`)
			.then(response => {
				this.setState({
					barResults: response.data.results
				});
			})
		}
	}

	// save a location by clicking on it
	searchNearby(placeId, name) {
	  	console.log('searching');
		this.setState({currentLocation: name});
		axios
		.get(`http://localhost:8080/search/autocomplete/${placeId}?auth_token=${this.props.user.token}`)
		.then(response => {
			this.setState({ 
				barResults: response.data.results, 
				locationResults: []
			}, () => console.log(this.state.barResults));
		});
	}
	// search for an save a location by text entry
	searchWithInput(bar) {
		axios
		.get(`http://localhost:8080/search/${this.state.currentLocation}/${bar}?auth_token=${this.props.user.token}`)
		.then(response => {
			this.setState({
				barResults: response.data.results, 
				locationResults: []
			}, () => console.log(this.state.barResults));
		})
	}


	// renders a form to search for bars based on location and name
	render(){
		return(
      <main>
      <EventsBar {...this.props} />
			<div className="bar-search">
				<SearchForm getLocationResults={this.getLocationResults} getBarResults={this.getBarResults}
					searchWithInput={this.searchWithInput} searchNearby={this.searchNearby} searchLocations={this.searchLocations}
          			results={this.state.locationResults} barResults={this.state.barResults}
        			eventId={this.state.eventId}
      				url={`/events/${this.state.eventId}/addBar/`}
      			/>
			</div>
    </main>
		);
	}
}

export default EventBarSearch;
