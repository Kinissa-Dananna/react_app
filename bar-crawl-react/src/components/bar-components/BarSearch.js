import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar.js';
import SearchForm from './SearchForm';
import Autocomplete from './Autocomplete';
import axios from 'axios';

class BarSearch extends Component {
	constructor(props){
		super(props);
		this.state ={
			locationResults: [],
			barResults: []
		}

		this.getLocationResults = this.getLocationResults.bind(this);
		this.getBarResults = this.getBarResults.bind(this);
    this.searchNearby = this.searchNearby.bind(this);
    this.searchWithInput = this.searchWithInput.bind(this);
	}

	// populate autofilled search results
getLocationResults(input) {
	console.log(input.length);
	if (input.length === 0) {
		this.setState({
			locationResults: []
		});
	} else {
		axios.get(`http://localhost:8080/search/${input}?auth_token=${this.props.user.token}`).then(response => {
			this.setState({
				locationResults: response.data.results
			});
		})
	}
}

// populate autofilled search results
getBarResults(input) {
if (input.length === 0) {
	this.setState({
		results: []
	});
} else {
	axios.get(`http://localhost:8080/search/${input}?auth_token=${this.props.user.token}`).then(response => {
		this.setState({
			barResults: response.data.results
		});
	})
}
}

// save a location by clicking on it
searchNearby(query, name) {
	axios.get(`http://localhost:8080/search/nearby/${query}?auth_token=${this.props.user.token}`).then(response => {
		this.setState({ barResults: []});
	})
}
// search for an save a location by text entry
searchWithInput(location, bar) {
	axios.get(`http://localhost:8080/search/${location}/${bar}?auth_token=${this.props.user.token}`).then(response => {
		this.setState({
			barResults: ''
		}, () => console.log(this.state.results));
	})
}


	render(){

		return(
			<div className="bar-search">
				<SearchForm getLocationResults={this.getLocationResults} getBarResults={this.getBarResults}
					searchWithInput={this.searchWithInput} searchNearby={this.searchNearby} results={this.state.locationResults}/>

			</div>
		);
	}
}

export default BarSearch;
