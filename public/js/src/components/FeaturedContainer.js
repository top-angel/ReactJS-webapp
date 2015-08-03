var React = require('react')
var FeaturedTile = require('./FeaturedTile')

var FeaturedContainer = React.createClass({
	render: function() {
		return (
			<div className="flex-row flex featured-container overlay-container">
                <div className="overlay flex-column left-arrow click">
                    <i className="fa fa-2x fa-chevron-left center"></i>
                </div>
                <div className="overlay flex-column right-arrow click">
                    <i className="fa fa-2x fa-chevron-right center"></i>
                </div>
                <FeaturedTile />
            </div>
		);
	}
})

module.exports = FeaturedContainer