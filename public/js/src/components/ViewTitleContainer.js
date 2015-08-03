var React = require('react')

var ViewTitleContainer = React.createClass({
	getInitialState: function() {
		return {
			title: 'Featured' //default
		};
	},
	render: function() {
		return (
			<div className="flex-column view-title-container flex-zero">
                <div className="center view-title">{this.state.title}</div>
                <div className="divider"></div>
            </div>
		);
	}
});

module.exports = ViewTitleContainer