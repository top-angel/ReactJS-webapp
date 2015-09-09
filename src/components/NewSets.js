import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var NewSets = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},
	componentWillMount: function() {
		this.getNewSets();
	},
	getNewSets: function() {
		var _this = this;
		var userId = this.props.appState.get('userId');
		var push = this.props.push;
		var results,
			newSetsUrl = constants.API_ROOT + 'user/stream/' + userId + '?filter=sets';

		$.ajax({
			url: newSetsUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.user.stream;

			push({
				type: 'SHALLOW_MERGE',
				data: {
					newSets: results
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},
	render: function() {
		var newSets = this.props.appState.get('newSets');
		var containerId = 'NewSets';

		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer
					containerId={containerId}
					sets={newSets}
					push={this.props.push}
				/>
			</Loader>
		);
	}

});

module.exports = NewSets;