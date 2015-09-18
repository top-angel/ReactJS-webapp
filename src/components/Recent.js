import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var TITLE = 'Recent';
var TYPE = 'set';

var Recent = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},
	componentWillMount: function() {
		 this.getRecentSets();
	},
	getRecentSets: function() {
		var _this = this;
		var push = this.props.push;
		var results,
			recentUrl = constants.API_ROOT + 'recent';

		$.ajax({
			url: recentUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.recent;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					recentBrowseData: results
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},
	render: function() {
		var data = this.props.appState.get('recentBrowseData');
		var push = this.props.push;
		var containerClass = 'flex-row scrollable tile-container';
		
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer
					push={push}
					sets={data}
					containerClass={containerClass}/>
			</Loader>
		);
	}

});

module.exports = Recent;