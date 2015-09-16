import React from 'react';
import constants from '../constants/constants';

import TrackContainer from './TrackContainer';
import SetContainer from './SetContainer';
import EventContainer from'./EventContainer';

import ArtistTile from './ArtistTile';

var Sandbox = React.createClass({

	getDefaultProps: function() {
		return {
			appState: {}
		};
	},

	componentDidMount: function() {
		console.log(this.props.params.id);
	},
	
	render: function() {
		var push = this.props.push;
		var appState = this.props.appState;

		return (
			<div className='view sandbox'>
			<div className='center'>
				{'>2015'}
				<br/>
				{'>still building websites in react'}
				<br/>
				{'>mfw'}
			</div>
			</div>
		);
	}

});

module.exports = Sandbox;