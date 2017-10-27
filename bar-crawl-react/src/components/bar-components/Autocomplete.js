import React, { Component } from 'react';

class Autocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.onClick = this.onClick.bind(this);
  }
  // clicking a result submits a search for it
  onClick(event) {
    const placeId = event.target.dataset.placeid;
    const name = event.target.dataset.text;
    this.props.saveLocation(placeId, name);
  }

  render() {
    return (
      <div className='search-results'>
        {this.props.results.map((result, i) =>
          <div href='/'
            key={i}
            className='location-result'
            onClick={this.onClick}
            data-text={result.description}
            data-placeid={result.placeId}>
            {result.description}<br/>
          </div>
        )}
      </div>
    );
  }

}

export default Autocomplete;
