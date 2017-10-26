import React, { Component } from 'react';
import { BrowserRouter} from "react-router-dom";
import axios from 'axios';
import Events from './Events';

class Homepage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  return (
    <BrowserRouter>
      <Events logout={this.props.logout}/>
    </BrowserRouter>
  );
  }

}

export default Homepage;
