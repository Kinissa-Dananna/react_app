import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";
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


    componentDidMount() {
		const eventId = this.props.match.params.eventId;
		axios
			.get(`http://localhost:8080/events/${eventId}?auth_token=${this.props.user.token}`)
			.then(response => {
				this.setState({
					attendees: response.data.attendees
				})
			});
	}


    componentDidUpdate(prevProps, newProps) {
		const eventId = this.props.match.params.id;
		if (eventId !== prevProps.match.params.id) {
		axios
			.get(`http://localhost:8080/events/${eventId}?auth_token=${this.props.user.token}`)
			.then(response => {
				this.setState({
					attendees: response.data.attendees
				})
			});
		}
	}


    onClickUser(user){
      const eventId = this.props.match.params.eventId;
      const userId = user.id;

        axios
        	.delete(`http://localhost:8080/events/${eventId}/user/${userId}?auth_token=${this.props.user.token}`)
            .then(response => {
              this.setState({ submitted: true })
            })
    };

    populateList() {
        //let userMatch;
        if (this.state.attendees.length>0) {
        return this.state.attendees.map((user, i) => {
        	console.log(user);
        	console.log(user.id)
          return <div><img src={user.image} key={i} /><p>{user.name}</p><button className='userList' onClick={  (e) => {
            e.preventDefault();
            this.onClickUser(user)
          } }
                    id={user.id} key={i}>
                    remove
                  </button></div>;


        }) }
    }


    render() {
      const eventId = this.props.match.params.eventId;
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