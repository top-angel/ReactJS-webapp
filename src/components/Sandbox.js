import React from 'react';
import constants from '../constants/constants';

import LoginOverlay from './LoginOverlay';

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
			<div className='sandbox view'>
				<p className='center'>
					>tfw new website
					<br/>
					>tfw react.js master race
					<br/>
					>tfw jediscript can't melt steal beams
				</p>
			</div>
		);
	}

});

module.exports = Sandbox;