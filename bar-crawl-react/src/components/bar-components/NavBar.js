import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from '../../images/Logo-V01.png';
import EventForm from './EventForm.js';


class NavBar extends Component {
	constructor(props){
		super(props);
	}

	// create buttons that link to Home, Events, Bars, and the log in page

	render(){

		return(
			<header>
        <nav>
          <li>
            <Link to="/barcrawl" > home </Link>
          </li>
          <li>
            <Link to="/events" > events </Link>
          </li>
          <img className="logo" src={Logo} alt="logo"/>
          <li>
            <Link to="/bars/search"> bars  </Link>
          </li>
          <li>
            <button onClick={this.props.logout}>logout</button>
          </li>
        </nav>
        <div className="border-bottom">
          <Link to='/events/new'>Create Event</Link>
        </div>
      </header>
		);
	}
}

export default NavBar;
