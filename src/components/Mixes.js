import React from 'react';
import constants from '../constants/constants';
import BrowseView from './BrowseView';
import MixTile from './MixTile';

var TITLE = 'Mixes';
var TYPE = 'mix';

var Mixes = React.createClass({

	componentWillMount: function() {
		 this.getMixes();
	},
	getMixes: function() {
		var push = this.props.push;
		var results,
			mixUrl = constants.API_ROOT + 'mix';

		$.ajax({
			url: mixUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.mix;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					mixBrowseData: results
				}
			});
		});
	},
	render: function() {
		var push = this.props.push;
		var appState = this.props.appState.get('mixBrowseData');
		var browseClass='flex-row flex-fixed-4x scrollable results-container';

		var tiles = appState.map(function(tile, index) {
			return <MixTile
						data={tile}
						key={index}
						dataId={tile.id}
						push={push}
					/>
		})
		return (
			<div className={browseClass}>
				{tiles}
			</div>
		);
	}

});

module.exports = Mixes;