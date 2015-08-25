import React from 'react';
import {Navigation} from 'react-router';

var HomeSidebar = React.createClass({
	mixins: [Navigation],
	render: function() {
		return (
			<div className="flex-column flex-fixed sidebar">
				<div className="flex flex-column overlay-container user-background">
				  <img className="user-image center" src='' />
				</div>
				<div className="flex-2x flex-column user-nav">
					<div className="view-trigger click flex flex-row active" name="my-sets">
					   <div>My Sets</div>
					</div>
					<div className="view-trigger click flex flex-row" name="new">
					   <div>New</div>
					</div>
					<div className="view-trigger click flex flex-row" name="activities">
					   <div>Activities</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = HomeSidebar;