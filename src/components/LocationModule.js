import React from 'react';
import {Link} from 'react-router';

var LocationModule = React.createClass({

	displayName: 'LandingModule',
	componentDidMount: function() {
		this.updateLocation();
	},
	getLocation: function() {
		//
	},
	updateLocation: function() {
		var push = this.props.push;
		var currentLocation = this.props.appState.get('currentLocation');
		var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentLocation.latitude + ',' + currentLocation.longitude;
		console.log(geocodeUrl);

		$.ajax({
			type: 'get',
			url: geocodeUrl,
			success: function(response) {
				if(response.status == "OK") {
					var address = response.results[0].formatted_address;
					console.log(response);

					push({
						type: 'SHALLOW_MERGE',
						data: {
							address: address
						}
					});

				}
			}
		});
	},
	getEvents: function(location) {
		var currentLocation = this.props.appState.get('currentLocation');

		$.ajax({
			type: 'GET',
			url: constants.API_ROOT + 'upcoming?date=' + getDateAsString(date) + '&latitude=' + location.latitude + '&longitude=' + location.longitude + '&id=' + upcomingEventSearchId,
			success: function(response) {
				if(response.status == "success") {
					var currentEvents = data.payload.upcoming;
					//push events
				} else {
					console.log("Could not get events");
				}
			}
		});
	},
	changeEventType: function() {
		var push = this.props.push;
		//switch between soonestEvents, closestEvents, soonestEventsAroundMe
	},
	render: function() {
		var data = this.props.appState.get('currentLocation');

		return (
			<div className="flex-row featured-results-header">
				<div className="flex center">Upcoming Events</div>
				<div className="buffer-2x"/>
				<div className="flex center flex-row">
					<i className="flex fa fa-map-marker"></i>
					<div className="flex user-location">{data.city}</div>
					<div className="flex change-location" onClick={this.changeLocation}>
						Change
					</div>
				</div>
			</div>
		);
	}

});

module.exports = LocationModule;