import React from 'react';
import constants from '../constants/constants';
import {RouteHandler} from 'react-router';
import Routes from '../index';

import SetContainer from './SetContainer';
import EventContainer from './EventContainer';
import ArtistTileContainer from './BrowseContainer';

import DetailNavContainer from './DetailNavContainer';
import DetailImageContainer from './DetailImageContainer';
import LinkButtonContainer from './LinkButtonContainer';

var DetailView = React.createClass({

	getDefaultProps: function() {
		return {
			data: {
				upcomingEvents: [],
				sets: [],
				lineup: []
			},
			navTitles: [],
			info: null,
			title: null,
			buttonText: null
		};
	},
	render: function() {
		var linkUrls = this.props.data.links || {};
		var links = [
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
		var push = this.props.push;
		var upcomingEvents = this.props.data.upcomingEvents;
		var sets = this.props.data.sets;
		var artists = this.props.data.lineup;
		var push = this.props.push;
		var containerClass='flex-row flex';

		return(
			<div id='detail' className='view detail-page'>
				<DetailImageContainer
					title={this.props.title}
					buttonText={this.props.buttonText}
					imageURL={this.props.data.main_imageURL || this.props.data.imageURL}
					info={this.props.info}/>
				<LinkButtonContainer links={links}/>
				<div className='divider'/>
				<DetailNavContainer navTitles={this.props.navTitles} />
				<RouteHandler
					containerClass={containerClass}
					sets={sets}
					artists={artists}
					events={upcomingEvents}
					push={push}
				/>
			</div>
		);
	}
});

module.exports = DetailView;