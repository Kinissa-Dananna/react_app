import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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

    }
    // controlled input
    handleLocationChange(event) {
      event.preventDefault();
      this.setState({
        locationValue: event.target.value
      }, () => {
        if (this.state.locationValue.length > 2 || this.state.locationValue.length === 0) {
          this.props.getLocationResults(this.state.locationValue)
        }
      });
    }

    updateInput(name) {
      this.setState({locationValue: name});
    }

    handleQueryChange(event) {
      event.preventDefault();
      this.setState({
        queryValue: event.target.value
      });
    }
    // submitting instead of clicking a result
    onSubmit(event) {
      console.log('searching');
      event.preventDefault();
      console.log(this.state.queryValue);
      this.props.searchWithInput(this.state.queryValue);
    }

    render() {
      return (
        <div>

            <div className='location-search'><input className='location-bar' type='text' placeholder='search for a location'
              value={this.state.locationValue} onChange={this.handleLocationChange}/>
            <Autocomplete searchNearby={this.props.searchNearby} results={this.props.results} updateInput={this.updateInput}/></div>
            <form className='search-form' onSubmit={this.onSubmit}>
            <input className='bar-bar' type='text' placeholder='search for a bar' value={this.state.queryValue} onChange={this.handleQueryChange}/>
            </form>
            {this.props.barResults.map((bar, i) => <Link to={`/bars/search/${bar.barId}`} key={i}><div data-barid={bar.barId}>{bar.name}</div></Link>)}


        </div>
      );
    }

  }

export default SearchForm;
