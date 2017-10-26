import React, { Component } from "react";
import { GoogleMap, Marker } from "react-google-maps"

class map extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const lat = this.props.lat,
			  long = this.props.long;

		return( 
			<GoogleMap
			    defaultZoom={8}
			    defaultCenter={{ lat: lat, lng: long }}
			>
			    {this.props.isMarkerShown && <Marker position={{ lat: lat, lng: long }} />}
			</GoogleMap>
		)
	}
 
}


export default map;
// <map isMarkerShown />// Map with a Marker
// <map isMarkerShown={false} />// Just only Map