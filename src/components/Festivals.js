import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';

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
		var results,
			festivalUrl = constants.API_ROOT + 'festival';

		$.ajax({
			url: festivalUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.festival;
			
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
		var containerClass = 'flex-row scrollable';

		var tiles = appState.map(function(festival, index) {
			var props = {
				push: push,
				key: index,
				id: festival.id,
				main_imageURL: festival.main_imageURL,
				set_count: festival.set_count,
				event: festival.event
			};

			return <FestivalTile {...props} />
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div className={containerClass}>
					{tiles}
				</div>
			</Loader>
		);
	}

});

module.exports = Festivals;