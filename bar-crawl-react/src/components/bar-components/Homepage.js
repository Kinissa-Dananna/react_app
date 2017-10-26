import React, { Component } from 'react';
import axios from 'axios';
import Events from './Events';

class Homepage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  return (
      <Events logout={this.props.logout}/>
  );
  }

}

export default Homepage;
