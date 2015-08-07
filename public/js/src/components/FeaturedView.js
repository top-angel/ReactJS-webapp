var React = require('react')
var ViewTitleContainer = require('./ViewTitleContainer')
var FeaturedContainer = require('./FeaturedContainer')
var FeaturedResultsHeader = require('./FeaturedResultsHeader')
var ResultsContainer = require('./ResultsContainer')

var currentEvents;

var FeaturedView = React.createClass({
	componentDidMount: function() {
		 this.getEvents();
	},
	getEvents: function(date, location, callback, orderBy) {
		$.ajax({
			type: 'GET',
			url: API_ROOT + 'upcoming?date=' + getDateAsString(date) + '&latitude=' + location.latitude + '&longitude=' + location.longitude + '&id=' + upcomingEventSearchId,
			success: function(data) {
				clearEventSearch();
				upcomingEventSearchId = "null";
				if(data.status == "success") {
					currentEvents = data.payload.upcoming;
					// callback(data.payload, orderBy);
				}
				else {
					console.log("Could not get events");
				}
			}
		});
	},
	render: function() {
		return (
			<div id="featured" className="view flex-column">
				<ViewTitleContainer title={'Featured'}/>
				<FeaturedContainer data={this.props.data}/>
                <FeaturedResultsHeader />
                <ResultsContainer data={this.props.}/>
            </div>
		);
	}
});


module.exports = FeaturedView