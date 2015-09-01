import React from 'react';
import DetailNavContainer from './DetailNavContainer';
import SetContainer from './SetContainer';
import EventContainer from './EventContainer';
import BrowseContainer from './BrowseContainer';

var DetailContentContainer = React.createClass({
	render: function() {
		var upcomingEvents = this.props.data.upcomingEvents || [];
		var push = this.props.push;
		return (
			<div>
				<DetailNavContainer navTitles={this.props.navTitles} />
				<SetContainer data={this.props.data.sets} push={push}/>
				<EventContainer data={upcomingEvents} push={push}/>
			</div>
		);
	}

});

module.exports = DetailContentContainer;