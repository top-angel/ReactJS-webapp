import React from 'react';
import constants from '../constants/constants';
import BrowseView from './BrowseView';

import FestivalTile from './FestivalTile';

var TITLE = 'Festivals';
var TYPE = 'event';
var Festivals = React.createClass({

	componentWillMount: function() {
		 this.getFestivals();
	},
	getFestivals: function() {
		var push = this.props.push;
		console.log(push);
		var results,
			festivalUrl = constants.API_ROOT + 'festival';

		$.ajax({
			url: festivalUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.festival;
			console.log(results);

			push({
				type: 'SHALLOW_MERGE',
				data: {
					festivalBrowseData: results
				}
			});
		});
	},
	render: function() {
		var appState = this.props.appState.get('festivalBrowseData');
		var push = this.props.push;
		var containerClass = 'flex-row flex-fixed-4x scrollable';

		var tiles = appState.map(function(festival, index) {
			return <FestivalTile
						data={festival}
						key={index}
						push={push}
					/>
		});

		return (
			<div className={containerClass}>
				<div className='flex-column view-title-container flex'>
					<div className='center view-title'>{TITLE}</div>
					<div className='divider'/>
				</div>
				{tiles}
			</div>
		);
	}

});

module.exports = Festivals;