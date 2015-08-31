import React from 'react';
import SetTile from './SetTile';

// import {State} from 'react-router';

var NewSets = React.createClass({

	// mixins: [State],
	render: function() {
		// var data = this.props.data;
		// var tiles = data.map(function(set) {
		// 	return (<SetTile data={set} key={set.id}/>);
		// });
		var testStyle={
			fontSize: '3rem',
			color: 'black'
		}
		return (
			<div className="flex-row flex-fixed-3x results-container">
				<p style={testStyle}>FUCK</p>
			</div>
		);
	}

});

module.exports = NewSets;