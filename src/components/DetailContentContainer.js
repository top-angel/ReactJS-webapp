import React from 'react';
import DetailNavContainer from './DetailNavContainer';
import SetContainer from './SetContainer';
import EventContainer from './EventContainer';
import BrowseContainer from './BrowseContainer';

var DetailContentContainer = React.createClass({
	render: function() {
		return (
			<div>
				<DetailNavContainer navTitles={this.props.navTitles} />
				<SetContainer data={this.props.data.sets}/>
				<EventContainer data={this.props.data.upcomingEvents}/>
			</div>
		);
	}

});

module.exports = DetailContentContainer;