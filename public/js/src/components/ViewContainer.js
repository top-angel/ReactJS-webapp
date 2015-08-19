var React = require('react');
//TODO require Bacon js

var DetailView = require('./DetailView');

var ViewContainer = React.createClass({
	displayName: 'ViewContainer',
	getInitialState: function() {
		return {
			view: 'LandingView'
		};
	},
	componentDidMount: function() {
		this._attachStreams();
	},
	render: function() {
		return (
			React.createElement(this.state.view, {
				viewStream: viewStream
			});
		);
	},
	_attachStreams: function() {
		var _this = this;

		function updateCurrentView(view) {
			_this.setState({
				view: view
			})
		};

		_this.props.viewStream.onValue(updateCurrentView);
	}
});

module.exports = ViewContainer;