var React = require('react')
var ViewTitleContainer = require('./ViewTitleContainer')
var FeaturedContainer = require('./FeaturedContainer')
var FeaturedResultsHeader = require('./FeaturedResultsHeader')
var EventBrowseContainer = require('./EventBrowseContainer')

var FeaturedView = React.createClass({
	render: function() {
		return (
			<div id="featured" className="view flex-column">
				<ViewTitleContainer title='Featured'/>
				<FeaturedContainer landingEvents={this.props.landingEvents}/>
                <FeaturedResultsHeader />
                <EventBrowseContainer currentEvents={this.props.currentEvents}/>
            </div>
		);
	}
});

module.exports = FeaturedView