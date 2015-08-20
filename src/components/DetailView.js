var React = require('react');
var constants = require('../constants/constants');

var DetailImageContainer = require('./DetailImageContainer');
var LinkButtonContainer = require('./LinkButtonContainer');
var DetailContentContainer = require('./DetailContentContainer');
var SetContainer = require('./SetContainer')
// var EventContainer = require('./EventContainer')

var DetailView = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			hidden: true
		};
	},
	getArtist: function(){
		$.ajax({
			url: 'http://setmine.com'+constants.API_ROOT+'artist/'+this.props.artistId,
			type: 'GET',
		})
		.done(function(response) {
			console.log("success");
			this.setState({
				data: response.payload.artist
			});
		}.bind(this))
		.fail(function() {
			console.log("error");
		}.bind(this))
	},
	componentWillMount: function() {
		this.getArtist()
	},
	render: function() {
		//TEST determine if artist or event detail
		if(this.props.detailType == 'artist') {
			title = this.state.data.artist
			button_text = "Follow"
			info = this.state.data.set_count + " sets | " + this.state.data.event_count + " events"
			imageURL = this.state.data.imageURL
			navTitles = ["sets","events"]
		} else if(this.props.detailType == 'event') {
			title = this.state.data.event
			button_text = "Tickets"
			info = this.state.data.formattedDate
			imageURL = this.state.data.main_imageURL
			navTitles = ["lineup"]
		} else {
			return
		}
		var links = [
			{
				type: 'facebook',
				url: this.state.data.fb_link
			},
			{
				type: 'twitter',
				url: this.state.data.twitter_link
			},
			{
				type: 'instagram',
				url: this.state.data.instagram_link
			},
			{
				type: 'soundcloud',
				url: this.state.data.soundcloud_link
			},
			{
				type: 'youtube',
				url: this.state.data.youtube_link
			},
			{
				type: 'web',
				url: this.state.data.web_link
			}
		]
		return (
			<div id="detail" className="view detail-page">
				<DetailImageContainer title={title} button_text={button_text} imageURL={imageURL} info={info} />
				<LinkButtonContainer links={links} />
				<div className="divider"></div>
				<SetContainer data={this.state.data} />
			</div>
		);
	}
});

// <DetailContentContainer navTitles={navTitles} data={this.state.data} />
module.exports = DetailView;