import React from 'react';
import constants from '../constants/constants';

import DetailImageContainer from './DetailImageContainer';
import LinkButtonContainer from './LinkButtonContainer';
import DetailContentContainer from './DetailContentContainer';
import SetContainer from './SetContainer';

var DetailView = React.createClass({
	render: function() {
		var linkUrls = this.props.data.links || null;
		var links;
		if(linkUrls == null) {
			links = [];
		} else {
			links = [
			{
				type: 'facebook',
				url: linkUrls.facebook
			},
			{
				type: 'twitter',
				url: linkUrls.twitter
			},
			{
				type: 'instagram',
				url: linkUrls.instagram
			},
			{
				type: 'soundcloud',
				url: linkUrls.soundcloud
			},
			{
				type: 'youtube',
				url: linkUrls.youtube
			}
		];
		}
		
		return(
			<div id='detail' className='view detail-page'>
				<DetailImageContainer
					title={this.props.title}
					buttonText={this.props.buttonText}
					imageURL={this.props.data.imageURL}
					info={this.props.info}/>
				<LinkButtonContainer links={links}/>
				<div className='divider'/>
				<DetailContentContainer data={this.props.data} navTitles={this.props.navTitles}/>
			</div>
		);
	}
});

module.exports = DetailView;