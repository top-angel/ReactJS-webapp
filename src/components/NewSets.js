import React from 'react';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var NewSets = React.createClass({

	componentWillMount: function() {
		this.getNewSets();
	},
	getNewSets: function() {
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
		});
	},
	render: function() {
		var newSets = this.props.appState.get('newSets');
		var containerClass = 'flex-row flex-fixed-3x results-container';
		var containerId = 'NewSets';

		return (
			<SetContainer
			containerClass={containerClass}
			containerId={containerId}
			sets={newSets}/>
		);
	}

});

module.exports = NewSets;