import React, { Component } from 'react';
import { BrowserRouter} from "react-router-dom";
import BarCrawl from './BarCrawl.js';

class Homepage extends Component {
  render() {
  return (

    <BrowserRouter>
      <BarCrawl logout={this.props.logout} user={this.props.user}  />
    </BrowserRouter>
  );
  }

}

export default Homepage;
