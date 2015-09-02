import React from 'react';
import {RouteHandler} from 'react-router';
import Routes from '../index';
import DetailNavContainer from './DetailNavContainer';
import SetContainer from './SetContainer';
import EventContainer from './EventContainer';
import BrowseContainer from './BrowseContainer';

var DetailContentContainer = React.createClass({

	render: function() {
		var upcomingEvents = this.props.data.upcomingEvents || [];
		var sets = this.props.data.sets || [];
		var push = this.props.push;
		var containerClass='flex-row flex';
		return (
			<div>
				<DetailNavContainer navTitles={this.props.navTitles} />
				<RouteHandler
					containerClass={containerClass}
					sets={sets}
					events={upcomingEvents}
					push={push}
				/>
			</div>
		);
	}

});

module.exports = DetailContentContainer;