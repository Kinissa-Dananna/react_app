import { GoogleMap, Marker } from "react-google-maps"

class map extends Component{
	constructor(props){
		super(props);
		.currentStatus = this.currentStatus.bind(this);
	}
	render(){
		return( 
			<GoogleMap
			    defaultZoom={8}
			    defaultCenter={{ lat: {this.props.lat}, lng: {this.props.long} }}
			>
			    {props.isMarkerShown && <Marker position={{ lat: {this.props.lat}, lng: {this.props.long} }} />}
			</GoogleMap>
		)
	}
 
}


export default map;
// <map isMarkerShown />// Map with a Marker
// <map isMarkerShown={false} />// Just only Map