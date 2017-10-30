import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import BarCrawl from './bar-components/BarCrawl';


class UserAuth extends Component {
  constructor(props){
    super(props);
    // set up state
    this.state = {
      mode: 'login' // keeps track of if the user is logging in or signing up
    }
  }

  // toggleMode(e){ // toggle between the two modes
  //   e.preventDefault();
  //   this.setState(prev => { // the mode is what it is not
  //     prev.mode = prev.mode === "login" ? 'signup' : 'login';
  //     return prev
  //   })
  // }

  render(){
    // return this.state.mode === "login" ? (
    //   <Login {...this.props} toggleMode={this.toggleMode.bind(this)} />
    // ) : (
    //   <Signup {...this.props} toggleMode={this.toggleMode.bind(this)} />
    // )
    if(this.state.mode === 'auth') {
      return <Redirect to="/login" />
    }
    if(this.state.mode === 'content') {
      return <Redirect to="/events" />
    }
    return (
      <Switch>
        <Route
          exact
          path="/login"
          render={() => <Login {...this.props}  />}
        />
        <Route
					exact
					path="/signup"
					render={() => <Signup {...this.props}  />}
				/>
        <Route
					exact
					path="/events"
					render={() => <BarCrawl {...this.props}  />}
				/>
      </Switch>
    )
  }
}
export default UserAuth;
