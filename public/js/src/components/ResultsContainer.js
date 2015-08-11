var React = require('react')
var SetTile = require('./SetTile')
var EventTile = require('./EventTile')
var TrackTile = require('./TrackTile')
var BrowseTile = require('./BrowseTile')

var ResultsContainer = React.createClass({
	render: function() {
		var tiles = []
		if(this.props.type=='artist') {
			this.props.data.map(function(tile, index){
				tiles.push(<BrowseTile text={tile.artist} key={index} image={tile.imageURL} />)
			})
		} else if(this.props.type=='festival') {
			this.props.data.map(function(tile, index){
				tiles.push(<BrowseTile text={tile.event} key={index} image={tile.imageURL} />)
			})
		} else if(this.props.type=='mix') {
			this.props.data.map(function(tile, index){
				tiles.push(<BrowseTile text={tile.event} key={index} image={tile.imageURL} />)
			})
		} else if(this.props.type=='genre') {
			this.props.data.map(function(tile, index){
				tiles.push(<BrowseTile text={tile.genre} key={index} image={tile.imageURL} />)
			})
		}
		return (
			<div className="results-container flex-row flex">
				{tiles}
			</div>
		);
	}
});


module.exports = ResultsContainer