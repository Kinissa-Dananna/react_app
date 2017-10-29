import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from '../../images/Logo-V01.png';


class NavBar extends Component {
	// constructor(props){
	// 	super(props);
	// }

	// create buttons that link to Home, Events, Bars, and the log in page

	render(){

		return(
			<header>
        <nav>
          <li>
          <Link to='/events/new'> create event </Link>
          </li>
          <li>
            <Link to="/events" > all events </Link>
          </li>
          <img className="logo" src={Logo} alt="logo"/>
          <li>
            <Link to="/bars/search"> bars  </Link>
          </li>
          <li>
            <button onClick={this.props.logout}>logout</button>
          </li>
        </nav>
      </header>
		);
	}
}

export default NavBar;
