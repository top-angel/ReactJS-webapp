var React = require('react')
var ViewTitleContainer = require('./ViewTitleContainer')
var ResultsContainer = require('./ResultsContainer')
var constants = require('../constants/constants')

var title
var tileText

var BrowseView = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			title: undefined 
		};
	},
	getArtists: function(){
		$.ajax({
			url: 'http://setmine.com'+constants.API_ROOT+'artist',
			type: 'GET',
		})
		.done(function(response) {
			console.log("success");
			var artists = [];
			if(response.status=='success') {
				var artistModels = response.payload.artist
				for(var a in artistModels) {
					artists.push(artistModels[a])
				}
			}
			this.setState({
				data: artists,
				title: 'Artists'
			})
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this))
	},
	getFestivals: function() {
		$.ajax({
			url: 'http://setmine.com'+constants.API_ROOT+'festival',
			type: 'GET',
		})
		.done(function(response) {
			var festivals = [];
			if(response.status == "success") {
				var festivalModels = response.payload.festival;
				for(var f in festivalModels) {
					festivals.push(festivalModels[f])
				}
			}
			this.setState({
				data: festivals,
				title: 'Festivals' 
			});
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this))
	},
	getMixes: function() {
		$.ajax({
			url: 'http://setmine.com'+constants.API_ROOT+'mix',
			type: 'GET',
		})
		.done(function(response) {
			var mixes = []
			if(response.status == 'success') {
				var mixModels = response.payload.mix;
				for(var m in mixModels) {
					mixes.push(mixModels[m])
				}
			}
			this.setState({
				data: mixes,
				title: 'Mixes'
			});
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this))	
	},
	getGenres: function() {
		$.ajax({
			url: 'http://setmine.com'+constants.API_ROOT+'genre',
			type: 'GET',
		})
		.done(function(response) {
			var genres = []
			if(response.status == 'success') {
				var genreModels = response.payload.genre
				for(var g in genreModels) {
					genres.push(genreModels[g])
				}
			}
			this.setState({
				data: genres,
				title: 'Genres'
			});
		}.bind(this))
	},
	componentWillMount: function() {
		if(this.props.type=='artist') {
			this.getArtists()
		} else if(this.props.type=='festival') {
			this.getFestivals()
		} else if(this.props.type=='mix') {
			this.getMixes()
		} else if(this.props.type=='genre') {
			this.getGenres()
		}
	},
	render: function() {
		return (
			<div id="browse" className="view overlay-container">
				<ViewTitleContainer title={this.state.title} />
				<ResultsContainer data={this.state.data} type={this.props.type}/>
			</div>
		)
	}
})

module.exports = BrowseView