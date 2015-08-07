var React = require('react')
var FeaturedTile = require('./FeaturedTile')

var FeaturedContainer = React.createClass({
	render: function() {
        var featuredTiles = [];
        this.props.data.map(function(tile, index){
            featuredTiles.push(<FeaturedTile data={tile} key={index} />);
            console.log(tile);
        });
		return (
			<div className="flex-row flex featured-container overlay-container">
                <div className="overlay flex-column left-arrow click">
                    <i className="fa fa-2x fa-chevron-left center"></i>
                </div>
                <div className="overlay flex-column right-arrow click">
                    <i className="fa fa-2x fa-chevron-right center"></i>
                </div>
                {featuredTiles}
            </div>
		);
	}
})

module.exports = FeaturedContainer