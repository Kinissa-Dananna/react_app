import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import NavBar from './NavBar.js'
import EventsBar from './EventsBar.js';
import axios from 'axios';

class SingleEventView extends Component {
	constructor(props) {
    super(props);
    this.state = {
      bars: []
    }
  }

  componentDidMount() {
    const eventId = this.props.eventId;
  setTimeout(() => {
  axios.get(`http://localhost:8080/api/${eventId}`)
        .then(response => {
          this.setState({bars: response.data})
        });
  }, 1000)

}

	// function that gets information from the database for a single event

	// function that formats information for a single event

	render(){
		const barData = this.state.barData;
		return(
			<div className="single-event">
				<h2>Event.Name</h2>
				<div className="event">
					<div className="google-maps"></div>
					<h4>Bar.Name</h4>
					<p>Bar.</p>
				</div>
			</div>
		);
	}
}

export default SingleEventView;
