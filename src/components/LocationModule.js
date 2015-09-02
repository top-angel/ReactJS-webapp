import React from 'react';

var LocationModule = React.createClass({

	changeLocation: function() {
		var push = this.props.push;
		var locationData = this.props.appState.get('currentLocation');
		//TODO location functionality

		$.ajax({
			type: 'get',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentLocation.latitude + ',' + currentLocation.longitude,
			success: function(data) {
				if(data.status == "OK") {
					var address = data.results[0].formatted_address;
					$(".event.nav.item.map .nav.text").text(formatAddress(address));
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
				<div className="buffer-2x"></div>
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