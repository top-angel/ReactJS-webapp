import React from 'react';
import Geosuggest from 'react-geosuggest';
import {Link, IndexLink} from 'react-router';
import {API_ROOT} from '../constants/constants';
import history from '../services/history';

var LocationModule = React.createClass({

	componentWillMount() {
		navigator.geolocation.getCurrentPosition(this.getDefaultCoordinates);
		this.getClosestEvents();
	},

	getDefaultCoordinates(location) {
		var push = this.props.push;
		var coordinates = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			time: location.coords.timestamp
		};
	},

	getClosestEvents() {
		var push = this.props.push;
		var location = this.props.appState.get('location');
		console.log(location);
		var coordinates = location.location;
		console.log(coordinates);

// TODO this won't load for some reason
		$.ajax({
			url: `${API_ROOT}events/upcoming`,
			type: 'get',
			data: {
				latitude: coordinates.lat,
				longitude: coordinates.lng
			}
		}).done(res => {
			if(res.status === 'success') {
				push({
					type: 'SHALLOW_MERGE',
					data: {
						closestEvents: res.payload
					}
				});
			} else {
				console.log('Could not load events');
			}
		})
	},

	onSuggestSelect(suggest) {
		this.props.push({
			type: 'SHALLOW_MERGE',
			data: {
				location: suggest
			}
		});

		this.getClosestEvents();
		history.pushState(null, '/events/closest');
		mixpanel.track("Event Search Active", {
			"search": suggest
		});
	},

	render() {
		var defaultLocation = this.props.appState.get('location');

		return (
			<div id='LocationModule' className='flex-row flex-zero'>
				<Link className='flex click' to='/events' onlyActiveOnIndex={true} activeClassName='active'>Upcoming</Link>
				<Link className='flex click' to='/events/closest' activeClassName='active'>Around</Link>
				<div className='buffer-lg'/>
				<i className='flex fa fa-map-marker'/>
				<Geosuggest
					className='flex'
					location={new google.maps.LatLng(location.latitude, location.longitude)}
					radius={25}
					onSuggestSelect={this.onSuggestSelect} />
			</div>
		);
	}

});

export default LocationModule;