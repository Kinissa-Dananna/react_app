import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Autocomplete from './Autocomplete'

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationValue: '',
      queryValue: ''
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.onLocationSubmit = this.onLocationSubmit.bind(this);

  }
  // controlled input
  handleLocationChange(event) {
    event.preventDefault();
    this.setState({
      locationValue: event.target.value
    }, () => {

      this.props.getLocationResults(this.state.locationValue)


    });
  }

  // function to update the value of the location being searched for
  updateInput(name) {
    this.setState({ locationValue: name });
  }

  // updates location value to be searched
  handleQueryChange(event) {
    event.preventDefault();
    this.setState({
      queryValue: event.target.value
    });
  }
  // function that searches by submitting instead of clicking a result
  onSubmit(event) {
    console.log('searching');
    event.preventDefault();
    console.log(this.state.queryValue);
    this.props.searchWithInput(this.state.queryValue);
  }

  // function that searches by clicking a result
  onLocationSubmit(event) {
    console.log('searching');
    event.preventDefault();
    console.log(this.state.locationValue);
    this.props.searchLocations(this.state.locationValue);
    this.setState({ locationValue: this.props.currentLocation });
  }

  // render form and location search options as well as bar results from search
  render() {
    return (
      <div>
        <form className='search-form' onSubmit={this.onLocationSubmit}>
          <label>Search For A Location</label><br/>
          <div className='location-search'><input className='location-bar' type='text' placeholder='search for a location'
            value={this.state.locationValue} onChange={this.handleLocationChange} />
            <Autocomplete searchNearby={this.props.searchNearby} results={this.props.results} updateInput={this.updateInput} /></div></form>
        <form className='search-form' onSubmit={this.onSubmit}>
          <label>Search For A Bar</label><br/>
          <input className='bar-bar' type='text' placeholder='search for a bar' value={this.state.queryValue} onChange={this.handleQueryChange} />
          <input type="submit" value='OK' />
            {this.props.barResults.map((bar, i) => <Link to={`${this.props.url}${bar.barId}`} key={i}><div data-barid={bar.barId}>{bar.name}</div></Link>)}
        </form>



      </div>
    );
  }

}

export default SearchForm;
