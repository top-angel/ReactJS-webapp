import React from 'react';
import constants from '../constants/constants';
import Geosuggest from 'react-geosuggest';
import {Navigation, Link} from 'react-router';

var LocationModule = React.createClass({

	displayName: 'LandingModule',
	mixins: [Navigation],
	getDefaultProps: function() {
		return {
			appState: {
				location: {
					label: 'TEST SHIT FUCK THIS',
					location: {
						lat: 29.652175,
						lng: -82.325856
					}
				}
			}
		};
	},
	componentDidMount: function() {
		navigator.geolocation.getCurrentPosition(this.getDefaultCoordinates);
		this.getEventsByLocation();
	},
	getDefaultCoordinates: function(location) {
		var push = this.props.push;
		var coordinates = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			time: location.coords.timestamp
		};
	},
	getEventsByLocation: function() {
		var push = this.props.push;
		var location = this.props.appState.get('location');
		console.log(location);
		var coordinates = location.location;
		console.log(coordinates);

		var eventUrl = constants.API_ROOT + 'upcoming?latitude=' + coordinates.lat + '&longitude=' + coordinates.lng;

		$.ajax({
			type: 'get',
			url: eventUrl,
			success: function(response) {
				if(response.status == 'success') {
					push({
						type: 'SHALLOW_MERGE',
						data: {
							closestEvents: response.payload.upcoming.soonestEventsAroundMe,
							soonestEvents: response.payload.upcoming.soonestEvents
						}
					});
				} else {
					console.log('Could not get events');
				}
			}
		});
	},
	onSuggestSelect: function(suggest) {
		var push = this.props.push;

		push({
			type: 'SHALLOW_MERGE',
			data: {
				location: suggest
			}
		});

		// var location = this.props.appState.get('location');
		// console.log(location);

		this.getEventsByLocation();

		this.transitionTo('closest');
	},
	render: function() {
		var defaultLocation = this.props.appState.get('location');

		return (
			<div id='LocationModule' className='flex-row flex-zero'>
				<Link className='flex click' to='upcoming'>Upcoming</Link>
				<Link className='flex click' to='closest'>Around</Link>
				<div className='buffer-lg'/>
				<i className='flex fa fa-map-marker'/>
				<Geosuggest
					className='flex'
					location={new google.maps.LatLng(location.latitude, location.longitude)}
					onSuggestSelect={this.onSuggestSelect} />
			</div>
		);
	}

});

module.exports = LocationModule;