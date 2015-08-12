var React = require('react')
var constants = require('../constants/constants')

var ViewTitleContainer = require('./ViewTitleContainer')
var FeaturedContainer = require('./FeaturedContainer')
var FeaturedResultsHeader = require('./FeaturedResultsHeader')
var EventBrowseContainer = require('./EventBrowseContainer')

var FeaturedView = React.createClass({
	getInitialState: function() {
		return {
			landingEvents: [],
			currentEvents: [],
			hidden: true
		};
	},
	getLandingEvents: function() {
		$.ajax({
			url: 'http://setmine.com'+constants.API_ROOT+'landing',
			type: 'GET',
		})
		.done(function(response) {
			console.log("success");
			var landing = []
			var landingModels = response.payload.landing
			for(var l in landingModels) {
				landing[l] = landingModels[l]
			}
			this.setState({
				landingEvents: landing 
			});
			console.log('landing events loaded: '+this.state.landingEvents.length)
		}.bind(this))
		.fail(function() {
			console.log("error");
		}.bind(this))
	},
	getUpcomingEvents: function(date, location, orderBy) {
		$.ajax({
			url: 'http://setmine.com'+constants.API_ROOT+'upcoming',
			type: 'GET'
		})
		.done(function(response) {
			this.setState({
				currentEvents: response.payload.upcoming.soonestEvents
			});
			console.log('upcoming events loaded: '+this.state.currentEvents.length)
		}.bind(this))
		.fail(function() {
			console.log("error");
		}.bind(this))
	},
	componentWillMount: function() {
		this.getLandingEvents()
		this.getUpcomingEvents()
	},
	render: function() {
		return (
			<div id="featured" className="view flex-column">
				<ViewTitleContainer title='Featured'/>
				<FeaturedContainer landingEvents={this.state.landingEvents}/>
                <FeaturedResultsHeader />
                <EventBrowseContainer currentEvents={this.state.currentEvents}/>
            </div>
		);
	}
});

module.exports = FeaturedView