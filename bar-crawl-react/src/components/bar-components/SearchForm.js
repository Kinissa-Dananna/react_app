import React, { Component } from 'react';
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

    handleQueryChange(event) {
      event.preventDefault();
      this.setState({
        queryValue: event.target.value
      });
    }
    // submitting instead of clicking a result
    onSubmit(event) {
      event.preventDefault();
      console.log(this.state.locationValue);
      this.props.searchWithInput(this.state.locationValue);
      this.setState({locationValue: ''});
    }

    render() {
      return (
        <div>
          <form className='search-form' onSubmit={this.onSubmit}>

            <div className='location-search'><input className='location-bar' type='text' placeholder='search for a location'
              value={this.state.locationValue} onChange={this.handleLocationChange}/>
            <Autocomplete searchNearby={this.props.searchNearby} results={this.props.results}/></div>
            <input className='bar-bar' type='text' placeholder='search for a bar' value={this.state.queryValue} onChange={this.handleQueryChange}/>

          </form>

        </div>
      );
    }

  }

export default SearchForm;
