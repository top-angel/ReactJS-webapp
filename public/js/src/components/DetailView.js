var React = require('react');
var DetailImageContainer = require('./DetailImageContainer');
var LinksButtonContainer = require('./LinksButtonContainer');
var DetailContentContainer = require('./DetailContentContainer');

var DetailView = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			pageType: null 
		};
	},
	render: function() {
		//TEST determine if artist or event detail
		var detailType = 'artist'; // state
		if(detailType == 'artist') {
			title = this.props.detailData.artist
			button_text = "Follow"
			info = this.props.detailData.set_count + " sets | " + this.props.detailData.event_count + " events"
			imageURL = this.props.detailData.imageURL
			navTitles = ["sets","events"]
		} else {
			title = this.props.detailData.event
			button_text = "Tickets"
			
			info = this.props.detailData.start_date + " - " + this.props.detailData.end_date

			imageURL = this.props.detailData.main_eventimageURL
			navTitles = ["lineup"]
		}
		content = this.props.detailData
		var links = [
			{
				type: 'facebook',
				url: this.props.detailData.fb_link
			},
			{
				type: 'twitter',
				url: this.props.detailData.twitter_link
			},
			{
				type: 'instagram',
				url: this.props.detailData.instagram_link
			},
			{
				type: 'soundcloud',
				url: this.props.detailData.soundcloud_link
			},
			{
				type: 'youtube',
				url: this.props.detailData.youtube_link
			},
			{
				type: 'web',
				url: this.props.detailData.web_link
			}
		]
		console.log(this.props.detailData)
		console.log(links)
		return (
			<div id="detail" className="view detail-page">
				<DetailImageContainer title={title} button_text={button_text} imageURL={imageURL} info={info} />
				<LinkButtonsContainer links={links} />
				<div className="divider"></div>
				<DetailContentContainer navTitles={navTitles} content={content} />
			</div>
		);
	}
});

var DetailImageContainer = React.createClass({	// Displays key detail information
	render: function() {
		return (
			<div className="flex-column flex image-container overlay-container" style={{background: "url('" + S3_ROOT_FOR_IMAGES + imageURL + "')"}}>
                <div className="overlay"></div>
                <div className="buffer"></div>
                <div className="header center artist-name">{title}</div>
                <div className="header-small center">{info}</div>
                <div className="buffer"></div>
                <div className="header-small center click" id="detail-button">{button_text}</div>
                <div className="buffer"></div>
            </div>
		);
	}
});

module.exports = DetailView;