import React, { Component } from 'react';

const SearchForm = (props) => {
  return (
    <input type='text'
      onChange={props.search} // going to need to change this
      value={props.q} //this too
      placeholder='Search for Bars!' />
  )
}

export default SearchForm;