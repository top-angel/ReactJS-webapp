import React from 'react';
import constants from '../constants/constants';

import ViewTitleContainer from './ViewTitleContainer';
import FeaturedContainer from './FeaturedContainer';
import FeaturedResultsHeader from './FeaturedResultsHeader';
import EventBrowseContainer from './EventBrowseContainer';


//TODO: shit breaks when you render
var FeaturedView = React.createClass({
	getLandingEvents: function() {
		var push = this.props.push;
		var landing,
			splitLanding,
			landingUrl = constants.API_ROOT + 'landing';

		$.ajax({
			url: landingUrl,
			type: 'GET',
		})
		.done(function(response) {
			var landing = [];
			var splitLanding = [];
			var landingModels = response.payload.landing;
			for(var l in landingModels) {
				landing[l] = landingModels[l]
				if(landing.length == landingModels.length) {
					var splits = Math.ceil(landing.length / 4)
					for(var i = 0; i < splits; i++) {
						splitLanding[i] = []
						for(var j = (i*4); j < (i*4)+4; j++) {
							if(j < landing.length) {
								splitLanding[i].push(landing[j])
							} else break
						}
					}
				}
			}

			push({
				type: 'SHALLOW_MERGE',
				data: {
					landingData: splitLanding
				}
			});

			console.log('landing events loaded: '+this.state.landingEvents.length);
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
			eventData = response.payload.upcoming.soonestEvents;
			console.log('upcoming events loaded: ' + eventData.length);
		});
	},
	componentWillMount: function() {
		this.getLandingEvents();
		// this.getUpcomingEvents();
	},
	render: function() {
		return (
			<div id="featured" className="view flex-column">
				<div className="flex-column view-title-container flex-zero">
					<div className="center view-title">Featured</div>
					<div className="divider"></div>
				</div>
				<FeaturedContainer landingEvents={this.state.landingEvents}/>
				<FeaturedResultsHeader
					push={this.props.push}
                	appState={this.props.appState}/>
				<EventBrowseContainer 
					pushFn={this.props.pushFn}
					appState={this.props.appState}/>
          </div>
		);
	}
});

module.exports = FeaturedView