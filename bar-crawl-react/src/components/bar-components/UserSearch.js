import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';
import EventsBar from './EventsBar';

class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userOptions: [],
            userInput: '',
            dataLoaded: false,
            submitted: false,
            error: ''
        };
        this.changeUserInput = this.changeUserInput.bind(this);
        this.autocompleteUser = this.autocompleteUser.bind(this);
        this.onClickUser = this.onClickUser.bind(this);
        this.populateList = this.populateList.bind(this);
    };

    // onChange function that sets state of userInput
    changeUserInput(event) {
        event.preventDefault();
        this.setState({ userInput: event.target.value, error: '' }, this.autocompleteUser);
    };

    // function that will get user data matching search input
    autocompleteUser(event) {
        const { userInput } = this.state;
        axios.get(`http://localhost:8080/user-search/${userInput}?auth_token=${this.props.user.token}`)
            .then(response => {
              console.log(response)
              this.setState({
                userOptions: [response.data],
                dataLoaded: true })
            })
            .catch(err => {
              this.setState({
                userOptions: [],
                dataLoaded: true })
            })
    };

    // onClick function that adds user to this event
    onClickUser(user){
      const eventId = this.props.match.params.eventId;
      const userId = user.userId;
      console.log(userId);

        axios.post(`http://localhost:8080/events/${eventId}/newuser?auth_token=${this.props.user.token}`,
            { eventId, userId })
            .then(response => {
              this.setState({ submitted: true })
            })
            .catch(err => {console.log(err.response);
            this.setState({error: err.response.data.message})})
    };

    //  function that creates a list of all users attending this event with
    // their picture and their name as a button to add them
    populateList() {
        if (this.state.userOptions.length>0) {
        return this.state.userOptions.map((user, i) => {
          return <div><img src={user.image} key={i} alt="user" /><button className='autocomplete' onClick={  (e) => {
            e.preventDefault();
            this.onClickUser(user)
          } }
                    id={user.userId} key={i}>
                    {user.userName}
                  </button></div>;

        }) }
    }

    // render form to search users based on text input
    // list of users and set redirect function to go
    // back to single event view when a user is added
    render() {
      //const eventId = this.props.match.params.eventId;
      console.log('submitted', this.state.submitted);

      return(
        <main>
				<EventsBar {...this.props} />
            <div>
                <h3>Add Users</h3>
                <form>
                    <label>
                        Search User by Name:
                    </label><br/>
                    <input
                        type='text'
                        value={this.state.userInput}
                        onChange={this.changeUserInput}
                    />
                    <br />
                    <div id="list">{this.populateList()}</div>
                </form>
                <p className="error">{this.state.error}</p>
                {this.state.submitted === true && <Redirect to={`/events/${this.props.match.params.eventId}`}/>}
            </div>
          </main>

        );
    }

};

export default UserSearch;
