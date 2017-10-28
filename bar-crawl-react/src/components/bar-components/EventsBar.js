import React, {Component} from "react";
import {BrowserRouter, Route, Link, Redirect} from "react-router-dom";
import axios from 'axios';

class EventBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
			allEvents: []
    }
  }
  componentDidMount() {
    axios.get(`http://localhost:8080/events/owned?auth_token=${this.props.user.token}`).then(response => {
      //console.log('response', response);
      this.setState({events: response.data})
    });
    axios.get(`http://localhost:8080/events?auth_token=${this.props.user.token}`).then(response => {
      console.log('response', response);
      this.setState({allEvents: response.data})
    });
  }

  eventsItem({
    ownerId,
    name,
    description,
    time,
    id
  }, i) {
    return (
      <li className="events-item" key={i.toString()}>
        <p>
          <Link to={`/events/${id}`}>{name}</Link>
        </p>
      </li>
    );
  }

  //function that maps over event cards and renders them in the page

  render() {
    const eventsItems = this.state.events.map(this.eventsItem);
		const allEventsItems = this.state.allEvents.map(this.eventsItem);
    return (
      <div className='sidebar'>
				{eventsItems.length > 0 && <h4>Events You Own:</h4>}
        <ul>
          {eventsItems}
				</ul>
				{allEventsItems.length > 0 && <h4>Events You're Attending:</h4>}
				<ul>
					{allEventsItems}
        </ul>
      </div>
    )
  }

}

export default EventBar;
