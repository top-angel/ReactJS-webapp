var React = require('react')
var ViewTitleContainer = require('./ViewTitleContainer')
var ResultsContainer = require('./ResultsContainer')
var constants = require('../constants/constants')

var BrowseView = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			title: 'Artists'
		};
	},
	getArtists: function(){
		$.ajax({
			url: 'http://setmine.com'+constants.API_ROOT+'artist',
			type: 'GET',
		})
		.done(function(response) {
			console.log("success");
			var artists = []
			var splitArtists = []
			if(response.status=='success') {
				var artistModels = response.payload.artist
				for(var a in artistModels) {
					artists[a] = artistModels[a]
					if(artists.length == artistModels.length) {
						var splits = Math.ceil(artists.length / 50)
						for(var i = 0 ; i < splits ; i++) {
							splitArtists[i] = []
							for(var j = (i*50) ; j < (i*50)+50 ; j++) {
								if(j < artists.length) {
									splitArtists[i].push(artists[j]);
								} else break
							}
						}
					}
				}
			}
			//TODO: load splitArtists into ResultsContainer
			this.setState({
				data: artists,
				title: 'Artists'
			})
			// console.log(this.state.data.length + ' split artist arrays')
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
	componentWillMount: function() {
		if(this.props.type=='artist') {
			this.getArtists()
		} else if(this.props.type=='festival') {
			this.getFestivals()
		} else if(this.props.type=='mix') {
			this.getMixes()
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