import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import BrowseView from './BrowseView';

import FestivalTile from './FestivalTile';

var TITLE = 'Festivals';
var TYPE = 'event';
var Festivals = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},
	componentWillMount: function() {
		 this.getFestivals();
	},
	getFestivals: function() {
		var _this = this;
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

			_this.setState({
				loaded: true
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
			<Loader loaded={this.state.loaded}>
				<div className={containerClass}>
					<div className='flex-column view-title-container flex'>
						<div className='center view-title'>{TITLE}</div>
						<div className='divider'/>
					</div>
					{tiles}
				</div>
			</Loader>
		);
	}

});

module.exports = Festivals;