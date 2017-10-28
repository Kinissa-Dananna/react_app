import React, { Component } from "react";
import { Link } from "react-router-dom";
import EventCard from './EventCard';
// import EventsBar from './EventsBar';
import axios from 'axios';
import moment from 'moment';

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownedEvents: [],
      allEvents: []
    }
  }
  componentDidMount() {
    console.log(this.props.user.token);
    axios.get(`http://localhost:8080/events/owned?auth_token=${this.props.user.token}`).then(response => {
      console.log('response', response);
      this.setState({ ownedEvents: response.data })
    });
    axios.get(`http://localhost:8080/events?auth_token=${this.props.user.token}`).then(response => {
      console.log('response', response);
      this.setState({ allEvents: response.data })
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
      <Link to={`/events/${id}`}>
        <li className="events-item" key={i.toString()}>
          <h4>
            {name}</h4>
          <p>{description}</p>
          {/* <p>{time}</p> */}
          <p><em>{moment(time).format('dddd, MM/DD/YYYY')}</em></p>   
          <p><em>{moment(time).format('@ h:mm a')}</em></p>
        </li>
      </Link>
    );
  }

  //function that maps over event cards and renders them in the page

  render() {
    const eventsItems = this.state.ownedEvents.map(this.eventsItem);
    const allEventsItems = this.state.allEvents.map(this.eventsItem);
    return (
      <div className='events-list'>
        <ul>
          {/* {eventsItems} */}
          {eventsItems.length > 0 && <h1>Your Owned Events:</h1>}
          <EventCard eventsItems={eventsItems} />
          {allEventsItems.length > 0 && <h1>Events You're Attending:</h1>}
          <EventCard eventsItems={allEventsItems} />
        </ul>
      </div>
    )
  }

}

export default EventsList;
