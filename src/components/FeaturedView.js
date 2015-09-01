import React from 'react';
import constants from '../constants/constants';

import FeaturedContainer from './FeaturedContainer';
import FeaturedResultsHeader from './FeaturedResultsHeader';
import EventContainer from './EventContainer';

var FeaturedView = React.createClass({
	getLandingEvents: function() {
		var push = this.props.push;
		var landingUrl = constants.API_ROOT + 'landing';

		$.ajax({
			url: landingUrl,
			type: 'GET'
		})
		.done(function(response) {
			//TODO load landing events 4 at a time & make bigger
			var landingModels = response.payload.landing;
			var landing = [];
			var splitLanding = [];

			for(var l in landingModels) {
				landing[l] = landingModels[l];
				if(landing.length == landingModels.length) {
					var splits = Math.ceil(landing.length / 4)
					for(var i = 0; i < splits; i++) {
						splitLanding[i] = [];
						for(var j = (i*4); j < (i*4)+4; j++) {
							if(j < landing.length) {
								splitLanding[i].push(landing[j]);
							} else break;
						}
					}
				}
			}

			console.log(splitLanding);

			push({
				type: 'SHALLOW_MERGE',
				data: {
					landingData: splitLanding,
					allLanding: landingModels,
					activeLanding: splitLanding[0]
				}
			});

		});
	},
	getUpcomingEvents: function() {
		//TODO get closestEvents and soonestEventsAroundMe 
		var push = this.props.push;
		var eventData,
			upcomingUrl = constants.API_ROOT+'upcoming';

		$.ajax({
			url: upcomingUrl,
			type: 'GET'
		})
		.done(function(response) {
			eventData = response.payload.upcoming.soonestEventsAroundMe;
			console.log('upcoming events loaded: ' + eventData.length);
			push({
				type: 'SHALLOW_MERGE',
				data: {
					upcomingEventData: eventData
				}
			});
		});
	},
	componentWillMount: function() {
		this.getLandingEvents();
		this.getUpcomingEvents();
	},
	render: function() {
		var push = this.props.push;
		var appState = this.props.appState;

		var landingData = appState.get('landingData');
		var activeLanding = appState.get('activeLanding');
		var allLanding = appState.get('allLanding');
		var eventData = appState.get('upcomingEventData');
		console.log(eventData);

		return (
			<div id="featured" className="view flex-column">
				<div className="flex-column view-title-container flex-zero">
					<div className="center view-title">Recent</div>
					<div className="divider"></div>
				</div>
				<FeaturedContainer 
					data={landingData}
					activeLanding={allLanding}
					push={push}/>
				<FeaturedResultsHeader
					push={push}
                	appState={appState}/>
				<EventContainer push={push} data={eventData}/>
          </div>
		);
	}
});

module.exports = FeaturedView