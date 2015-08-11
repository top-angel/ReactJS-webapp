var React = require('react')
var ViewTitleContainer = require('./ViewTitleContainer')
var ResultsContainer = require('./ResultsContainer')
var constants = require('../constants/constants')

var artists = [];
var splitArtists = [];
var festivals = [];
var mixes = [];
var genres = [];

var BrowseView = React.createClass({
	populateTiles: function(type) {
	},
	getArtists: function() {
		$.ajax({
			type: 'GET',
			url: 'http://setmine.com'+constants.API_ROOT+'artist',
			success: function(response) {
				if(response.status=='success') {
					var artistModels = response.payload.artist
					for(var a in artistModels) {
						artists.push(artistModels[a])
					}
					console.log(artists)
				}
			},
			complete: function(artists) {
				this.setState({
					data: artists 
				})
			}
		})
	},
	componentWillMount: function() {
		this.getArtists();
	},
	render: function() {
		if(this.props.type=='artist') {
			var title ='Artists'
		} else if(this.props.type=='festival') {
			var title = 'Festivals'
		} else if(this.props.type=='mix') {
			var title = 'Mixes'
		} else if(this.props.type=='genre') {
			var title = 'Genres'
		}
		return (
			<div id="browse" className="view overlay-container">
				<ViewTitleContainer title={title} />
				<ResultsContainer results={this.props.results} />
			</div>
		)
	}
})

module.exports = BrowseView