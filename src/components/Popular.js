import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var TITLE = 'Popular';
var TYPE = 'set';
var Popular = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},
	componentWillMount: function() {
		 this.getPopularSets();
	},
	getPopularSets: function() {
		var _this = this;
		var push = this.props.push;
		var results,
			popularUrl = constants.API_ROOT + 'popular';

		$.ajax({
			url: popularUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.popular;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					popularBrowseData: results
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},
	render: function() {
		var data = this.props.appState.get('popularBrowseData');
		var push = this.props.push;
		var containerClass = 'flex-row scrollable';
		
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

module.exports = Popular;