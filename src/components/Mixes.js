import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import MixTile from './MixTile';

var TITLE = 'Mixes';
var TYPE = 'mix';

var Mixes = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},
	componentWillMount: function() {
		 this.getMixes();
	},
	getMixes: function() {
		var _this = this;
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

			_this.setState({
				loaded: true
			});
		});
	},
	render: function() {
		var push = this.props.push;
		var appState = this.props.appState.get('mixBrowseData');
		var browseClass='flex-row scrollable tile-container';

		var tiles = appState.map(function(mix, index) {

			var props = {
				key: index,
				id: mix.id,
				push: push,
				event: mix.event,
				imageURL: mix.imageURL
			};

			return <MixTile {...props} />
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div className={browseClass}>
					{tiles}
				</div>
			</Loader>
		);
	}

});

module.exports = Mixes;