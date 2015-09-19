import React from 'react';
import R from 'ramda';
import constants from '../constants/constants';

import LoginOverlay from './LoginOverlay';

var Sandbox = React.createClass({

	getDefaultProps: function() {
		return {
			appState: {}
		};
	},

	componentDidMount: function() {
		this.checkFavorites();
	},

	checkFavorites() {
		var favorites = this.props.appState.get('user').favorite_set_ids;
		var test = R.toString(3684);
		console.log(favorites);
		console.log(R.contains(test, favorites));
	},
	
	render: function() {
		var push = this.props.push;
		var appState = this.props.appState;

		return (
			<div className='sandbox view'>
				<p className='center'>
					>tfw new website
					<br/>
					>tfw react.js master race
					<br/>
					>tfw jediscript can't melt steal beams
					<br/>
				</p>
			</div>
		);
	}

});

module.exports = Sandbox;