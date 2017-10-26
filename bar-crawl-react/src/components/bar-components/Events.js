import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import axios from 'axios';
import Logo from '../../images/Logo-V01.png';

class Events extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div className='events-container'>
      <header>
        <nav>
          <li><button>home</button></li>
          <li><button>events</button></li>
          <img className="logo" src={Logo} alt="logo"/>
          <li><button>bars </button></li>
        <li> <button onClick={this.props.logout}>logout</button></li>
        </nav>
        <div className="border-bottom">

        </div>
      </header>
      <main>
      <div className="container">
        <Switch>
          
        </Switch>

      </div>


      <div className="sidebar">
      </div>
      </main>
      </div>
    )
  }
}

export default Events;
