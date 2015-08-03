var React = require('react')
var ViewTitleContainer = require('./ViewTitleContainer')
var FeaturedContainer = require('./FeaturedContainer')
var FeaturedResultsHeader = require('./FeaturedResultsHeader')
var ResultsContainer = require('./ResultsContainer')

var FeaturedView = React.createClass({
	render: function() {
		return (
			<div id="featured" className="view flex-column hidden">
				<ViewTitleContainer />
				<FeaturedContainer />
                <FeaturedResultsHeader />
                <ResultsContainer />
            </div>
		);
	}
});


module.exports = FeaturedView