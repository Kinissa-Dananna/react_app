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
            submitted: false
        };
        this.changeUserInput = this.changeUserInput.bind(this);
        this.autocompleteUser = this.autocompleteUser.bind(this);
        this.onClickUser = this.onClickUser.bind(this);
        this.populateList = this.populateList.bind(this);
      //  this.redirectPage = this.redirectPage.bind(this);

    };

    // onChange function that sets state of userInput
    changeUserInput(event) {
        event.preventDefault();
        this.setState({ userInput: event.target.value }, this.autocompleteUser);
    };

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
            }
            )
    };

    onClickUser(user){
      const eventId = this.props.match.params.eventId;
      const userId = user.userId;

        axios.post(`http://localhost:8080/events/${eventId}/newuser?auth_token=${this.props.user.token}`,
            { eventId, userId })
            .then(response => {
              //return this.props.history.push(`../events/${eventId}`);
              this.setState({ submitted: true })
              //return  <Redirect from={`/events/${eventId}/user-search`} exact to={`/events/${eventId}`} />
            })
    };

    populateList() {
        //let userMatch;
        if (this.state.userOptions.length>0) {
        return this.state.userOptions.map((user, i) => {
          return <div><button className='autocomplete' onClick={  (e) => {
            e.preventDefault();
            this.onClickUser(user)
          } }
                    id={user.userId} key={i}>
                    {user.userName}
                  </button></div>;

        }) }
    }
    // redirectPage() {
    //   const eventId = this.props.match.params.eventId;
    //    if (this.state.submitted) {
    //     console.log('this.state.submitted = true');
    //    return  <Redirect from={`/events/${eventId}/user-search`} exact to={`/events/${eventId}`} />
    //   }
    // }

    render() {
      const eventId = this.props.match.params.eventId;
      console.log('submitted', this.state.submitted);

      return(
        <main>
				<EventsBar {...this.props} />
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
                {this.state.submitted === true && <Redirect to={`/events/${this.props.match.params.eventId}`}/>}
            </div>
          </main>

        );
    }

};

export default UserSearch;
