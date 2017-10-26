import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';
import NavBar from './NavBar.js'
import BarCrawl from './BarCrawl.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      	<NavBar/>
        <BarCrawl/>
      </BrowserRouter>
    );
  }
}

export default App;
