var React = require('react')
var SetTile = require('./SetTile')
var EventTile = require('./EventTile')
var TrackTile = require('./TrackTile')
var BrowseTile = require('./BrowseTile')

var artistTilesIterator = 0

var ResultsContainer = React.createClass({
	// addArtists: function() {
	// 	var splitArtists = this.props.data
	// 	console.log(splitArtists)
	// 	var i = artistTilesIterator
	// 	for(var j = 0 ; j < splitArtists[i].length ; j++) {
	// 		createArtistBrowseTile(splitArtists[i][j], $(".browse-panel"))
	// 		splitArtists.map(function(tile, index) {
	// 			tiles.push(<BrowseTile 
	// 				text={tile.artist} 
	// 				key={index} 
	// 				image={tile.imageURL}
	// 			/>)
	// 		})
	// 	}
	// 	var loadMore = $("<div class='load-more'> Loading... </div>")
	// 	loadMore.appendTo($(".results-container"))

	// 	$(window).on("scroll", function() {
	// 		if(loadMore.position().top < ($('#browse-panel-container').innerHeight() - loadMore.innerHeight() + 5)) {
	// 			$('#browse-panel-container').off();
	// 			$(".load-more").remove();
	// 			artistTilesIterator++;
	// 			addArtists();
	// 		}
	// 	})
	// },
	render: function() {
		var tiles = []
		if(this.props.type=='artist') {
			this.props.data.map(function(tile, index){
				tiles.push(<BrowseTile 
					text={tile.artist} 
					key={index} 
					image={tile.imageURL}
				/>)
			})
			// this.addArtists()
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