import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userOptions: [],
            userInput: '',
            dataLoaded: false,
        };
        this.changeUserInput = this.changeUserInput.bind(this);
        this.autocompleteUser = this.autocompleteUser.bind(this);
        this.onClickUser = this.onClickUser.bind(this);
        this.populateList = this.populateList.bind(this);

    };

    // onChange function that sets state of userInput
    changeUserInput(event) {
        event.preventDefault();
        this.setState({ userInput: event.target.value }, this.autocompleteUser);
    };

    // function that will search db for 
    // matching user as input changes
    autocompleteUser(event) {
        const { userInput } = this.state;
        axios.get(`http://localhost:8080/user-search/${userInput}?auth_token=${this.props.user.token}`)
            .then(response => {
              this.state.userOptions.push(response.data);
              this.setState({
                dataLoaded: true })
            })
    };

    // onClick function that saves chosen 
    // user from the list to an event
    onClickUser(user){
      const eventId = this.props.match.params.eventId;
      const userId = user.userId;

        axios.post(`http://localhost:8080/events/${eventId}/newuser?auth_token=${this.props.user.token}`,
            { eventId, userId })

    };

    // Function that populates drop down list 
    // with users from db search
    populateList() {
        if (this.state.userOptions.length>0) {
        return this.state.userOptions.map((user, i) => {
          return <button onClick={
              () => {this.onClickUser(user)}
            } id={user.userId} key={i}>
            {user.userName}
            </button>;

        }) }
    }


    // form to search for users to save to an event 
    // and link back to that event
    render() {
      const eventId = this.props.match.params.eventId;
      const link = `/events/${eventId}`
      
      return(

            <div>
                <h3>Add Users</h3>
                <form>
                    <label>
                        Search User by Name:
                    </label>
                    <input
                        type='text'
                        value={this.state.userInput}
                        onChange={this.changeUserInput}
                    />
                    <br />
                    <div id="list">{this.populateList()}</div>

                </form>
                <Link to= {link} >Back to Event</Link>
            </div>

        );
    }

};

export default UserSearch;