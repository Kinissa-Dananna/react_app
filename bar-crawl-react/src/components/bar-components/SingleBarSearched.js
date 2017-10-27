import React, { Component } from "react";
// import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
// import NavBar from './NavBar.js';
import map from './map.js';
import Iframe from 'react-iframe';
import axios from 'axios';
import {Route, Redirect} from 'react-router-dom';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class SingleBarSearched extends Component {
	constructor(props){
		super(props);
		this.state ={
			barInfo: [],
			haveData: false,
      added: 'false',
      ownedEvents: [],
      eventId: ''
		}

		this.currentStatus = this.currentStatus.bind(this);
    this.addBarToEvent = this.addBarToEvent.bind(this);
    this.getEventsToAddTo = this.getEventsToAddTo.bind(this);
    this.addBarToChosenEvent = this.addBarToChosenEvent.bind(this);
	}

	// function that gets information from localhost for a single bar
	componentDidMount(){
		const barId = this.props.match.params.barId;
		 axios
		    .get(`http://localhost:8080/search/bars/${barId}?auth_token=${this.props.user.token}`)
		    .then(response => {
					console.log('response', response)
		      this.setState({
						barInfo: response.data,
						haveData: true
					});
	    });
	}

	// function that formats open status based on current time and hours
	currentStatus(){
		if(this.state.barInfo.isOpen){
			return('Open Now')
		}else{
			return('Closed Now')
		}
	}

  getEventsToAddTo() {
    axios.get(`http://localhost:8080/events/owned?auth_token=${this.props.user.token}`)
					.then(response => {
            console.log('response', response);
						this.setState({ownedEvents: response.data})
					});
  }

  addBarToEvent(e) {
    e.preventDefault();
    const barId = this.props.match.params.barId;
    console.log(barId);
    const { name, lat, long } = this.state.barInfo;
    const eventId = this.props.match.params.eventId;
    const newData = {
      barId: barId,
      eventId: eventId,
      name: name,
      lat: lat,
      long: long
    }
    axios.post(`http://localhost:8080/bars/${eventId}/new?auth_token=${this.props.user.token}`, newData)
    .then(res => this.setState({added: 'fromEvent'}))
  }

  addBarToChosenEvent(e) {
    e.preventDefault();
    const barId = this.props.match.params.barId;
    console.log(barId);
    const { name, lat, long } = this.state.barInfo;
    const eventId = e.target.dataset.id;
    const newData = {
      barId: barId,
      eventId: eventId,
      name: name,
      lat: lat,
      long: long
    }
    axios.post(`http://localhost:8080/bars/${eventId}/new?auth_token=${this.props.user.token}`, newData)
    .then(res => this.setState({added: 'toEvent', eventId: eventId}))
  }

	// Formatted information for a single bar
  render(){
    console.log('in single bar view');
    if(!this.state.haveData) {
      return <h2>Waiting for Data to Load</h2>
    }
    else {
    const { name, address, price, rating, isOpen, daysOpen, hoursOpen, hoursUntilClosed, description, lat, long, map } = this.state.barInfo;
    //const map = this.state.map;
    console.log('map', map);
    return(
      <div className="single-bar">
        <div className="map">
          <iframe
              width="400"
              height="500"
              src={map} >
            </iframe>
          {/* <img src={map} alt="map" /> */}
        </div>
        <div className="bar-info">
        <h2>{name}</h2>
        <p className="bar-status">{this.currentStatus()}</p>
        {{isOpen} &&
          <p className="align-left">{hoursUntilClosed}</p>
        }
        {/* <p>Address:{address.street},{address.city}</p> */}
        <p className="align-left">Price Range: {price}</p>
        <p className="align-left">Rating: {rating}/10</p>
        <p className="align-left">Hours: {daysOpen} {hoursOpen}</p>
        <p className="align-left">Description: {description}</p>
      </div>
      <Route exact path="/events/:eventId/addBar/:barId" render={props => (
        <button onClick={this.addBarToEvent}>Add this bar</button>
        )} />
      <Route exact path="/bars/search/:barId" render={props => (
          <div><button onClick={this.getEventsToAddTo}>Add this bar to an event</button>
          <div>{this.state.ownedEvents.map((event, i) => <div><a href='/' data-id={event.id} key={i} onClick={this.addBarToChosenEvent}>{event.name}</a></div>)}</div></div>
          )} />
        {this.state.added === 'fromEvent' && <Redirect to={`/events/${this.props.match.params.eventId}`}/>}
        {this.state.added === 'toEvent' && <Redirect to={`/events/${this.state.eventId}`}/>}
    </div>
    )}
  }
}

export default SingleBarSearched;