var React = require('react');
var constants = require('../constants/constants');

var DetailImageContainer = require('./DetailImageContainer');
var LinkButtonContainer = require('./LinkButtonContainer');
var DetailContentContainer = require('./DetailContentContainer');

var DetailView = React.createClass({
	getInitialState: function() {
		return {
			detailData: [],
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
				detailData: response.payload.artist
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
			title = this.state.detailData.artist
			button_text = "Follow"
			info = this.state.detailData.set_count + " sets | " + this.state.detailData.event_count + " events"
			imageURL = this.state.detailData.imageURL
			navTitles = ["sets","events"]
		} else if(this.props.detailType == 'event') {
			title = this.state.detailData.event
			button_text = "Tickets"
			info = this.state.detailData.formattedDate
			imageURL = this.state.detailData.main_imageURL
			navTitles = ["lineup"]
		} else {
			return
		}
		var links = [
			{
				type: 'facebook',
				url: this.state.detailData.fb_link
			},
			{
				type: 'twitter',
				url: this.state.detailData.twitter_link
			},
			{
				type: 'instagram',
				url: this.state.detailData.instagram_link
			},
			{
				type: 'soundcloud',
				url: this.state.detailData.soundcloud_link
			},
			{
				type: 'youtube',
				url: this.state.detailData.youtube_link
			},
			{
				type: 'web',
				url: this.state.detailData.web_link
			}
		]
		return (
			<div id="detail" className="view detail-page">
				<DetailImageContainer title={title} button_text={button_text} imageURL={imageURL} info={info} />
				<LinkButtonContainer links={links} />
				<div className="divider"></div>
				<DetailContentContainer navTitles={navTitles} data={this.state.detailData} />
			</div>
		);
	}
});

module.exports = DetailView;