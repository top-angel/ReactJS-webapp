var React = require('react')
var ViewTitleContainer = require('./ViewTitleContainer')
var ResultsContainer = require('./ResultsContainer')


var BrowseView = React.createClass({
	populateTiles: function(type) {

	},
	render: function() {
		if(this.props.type=='artist') {
			var title ='Artists'
		} else if(this.props.type=='festival') {
			var title = 'Festivals'
		} else if(this.props.type=='mix') {
			var title = 'Mixes'
		} else if(this.props.type=='genres') {
			var title = 'Genres'
		}
		var tiles = [];
		this.props.data.map(function(tile, index){
			tiles.push(<BrowseTile data={tile}/>)
		})
		return (
			<div id="browse" className="view overlay-container">
				<ViewTitleContainer title={title} />
				<ResultsContainer results={this.props.results} />
			</div>
		)
	}
})

module.exports = BrowseView