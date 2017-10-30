import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import UserSearch from './UserSearch.js';
import axios from 'axios';
import moment from 'moment';
import EventsBar from './EventsBar';


class SingleEventView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: [],
			bars: [],
			attendees: [],
			deleted: false,
			ownerId: null,
			ownerImage: '',
			ownerName: '',
		}
		this.deleteEvent = this.deleteEvent.bind(this);
	}

	// function that gets information from the database for a single event
	componentDidMount() {
		const eventId = this.props.match.params.id;
		axios
			.get(`http://localhost:8080/events/${eventId}?auth_token=${this.props.user.token}`)
			.then(response => {
				console.log(response.data);
				this.setState({
					event: response.data,
					bars: response.data.bars,
					attendees: response.data.attendees,
					ownerId: response.data.ownerid,
					ownerImage: response.data.owner.image,
					ownerName: response.data.owner.name
				}, () => console.log(this.state.event.owner.image))
			});
	}


	// function that updates information from the database for a single event
	componentDidUpdate(prevProps,  prevState) {
		const eventId = this.props.match.params.id;
		if (eventId !== prevProps.match.params.id) {
		axios
			.get(`http://localhost:8080/events/${eventId}?auth_token=${this.props.user.token}`)
			.then(response => {
				this.setState({
					event: response.data,
					bars: response.data.bars,
					attendees: response.data.attendees,
					ownerId: response.data.ownerid,
					ownerImage: response.data.owner.image,
					ownerName: response.data.owner.name
				})
			});
		}
	}


  // function that deletes this event from the database
	deleteEvent(eventId) {
		console.log('delete click')
		axios.delete(`http://localhost:8080/events/${eventId}?auth_token=${this.props.user.token}`)
			.then(res => {
				console.log(res);
				this.setState({ deleted: true });
				this.props.history.push(`/events`);
			})
	}

	// Formatted information for a single event link to pages to add bars
	// and users to this event and to delete users from this event
	// sets redirect to all events page if this event is deleted
	render() {
		const { name, description, time} = this.state.event;
		const eventId = this.props.match.params.id;
		const bars = this.state.bars.map((bar) => {

			return (
				<Link to={`/events/${eventId}/bars/${bar.id}`} >{bar.name}<br /></Link>
			)
		})
		const attendees = this.state.attendees.map((user, i) => {
			console.log(user)
			console.log(user.image);
			return <img src={user.image} key={i} title={user.name}/>
		})

		attendees.unshift(<img src={this.state.ownerImage} title={this.state.ownerName}/>)

		if (this.state.deleted) {
			return <Redirect to={'/events'} />
		}

		return (
			<main>
			<EventsBar {...this.props} />
			<div className="single-event-container">
			<h1>{name}</h1>
			<div className="single-event">
				<div className="event-info">

					<h4>Description:</h4>
					<p>{description}</p>
					<h4>Start Time:</h4>
					{/* <p>{time}</p> */}
          <p><em>{moment(time).format('dddd, MMMM Do, YYYY')}</em></p>
          <p><em>{moment(time).format('@ h:mm a')}</em></p>
					{Number(this.props.user.id) === this.state.ownerId && <button onClick={(e) => {
						e.preventDefault();
						this.deleteEvent(eventId);
					}} > Delete This Event </button>}
				</div>
				<div className="bar-info">
					<h4>Bars:</h4>
					<p>{bars}</p>
					{Number(this.props.user.id) === this.state.ownerId && <Link to={`/events/${eventId}/addBar`} {...this.props}><button>Add Bars</button> </Link>}
				</div>
				<div className="attendees-info">
					<h4>Attending:</h4>
					<div className="attendees">{attendees}</div>
					{Number(this.props.user.id) === this.state.ownerId &&<Link to={`/events/${eventId}/user-search`} {...this.props} ><button>Add Users</button> </Link>}
					{Number(this.props.user.id) === this.state.ownerId &&<Link to={`/events/${eventId}/user-delete`} {...this.props} ><button>Remove Users</button> </Link>}
				</div>
			</div>
		</div>
		</main>
		);
	}

}

export default SingleEventView;
