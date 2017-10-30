import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendees: [],
            userInput: '',
            dataLoaded: false,
            submitted: false
        };
        this.onClickUser = this.onClickUser.bind(this);
        this.populateList = this.populateList.bind(this);

    };

    // get all users attending this event
    componentDidMount() {
		const eventId = this.props.match.params.eventId;
		axios
			.get(`http://barcrawlapi.herokuapp.com/events/${eventId}?auth_token=${this.props.user.token}`)
			.then(response => {
        console.log(response.data);
				this.setState({
					attendees: response.data.attendees
				})
			});
	}

	// update all users attending this event
    componentDidUpdate(prevProps, newProps) {
		const eventId = this.props.match.params.id;
		if (eventId !== prevProps.match.params.id) {
		axios
			.get(`http://barcrawlapi.herokuapp.com/events/${eventId}?auth_token=${this.props.user.token}`)
			.then(response => {
				this.setState({
					attendees: response.data.attendees
				})
			});
		}
	}

	// onClick function that deletes a user from this event
    onClickUser(user){
      const eventId = this.props.match.params.eventId;
      const userId = user.id;

        axios
        	.delete(`http://barcrawlapi.herokuapp.com/events/${eventId}/user/${userId}?auth_token=${this.props.user.token}`)
            .then(response => {
              this.setState({ submitted: true })
            })
    };

    // creates a list of all users attending this event with
    // their picture, their name, and a button to remove them
    populateList() {
        if (this.state.attendees.length>0) {
        return this.state.attendees.map((user, i) => {
        	console.log(user);
        	console.log(user.id)
          return <div><img src={user.image} key={i}  /><p>{user.name}</p><button className='userList' onClick={  (e) => {
            e.preventDefault();
            this.onClickUser(user)
          } }
                    id={user.id} key={i}>
                    Remove
                  </button></div>;


        }) }
    }

    // render list of users and set redirect function to go
    // back to single event view when a user is deleted
    render() {
      //const eventId = this.props.match.params.eventId;
      console.log('submitted', this.state.submitted);


      return(
            <div>
                <h3>Remove Users</h3>

                <div id="list">{this.populateList()}</div>

                {this.state.submitted === true && <Redirect to={`/events/${this.props.match.params.eventId}`}/>}
            </div>

        );
    }

};

export default UserSearch;
