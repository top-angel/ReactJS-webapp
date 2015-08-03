var React = require('react')
var SetTile = require('./SetTile')

var ResultsContainer = React.createClass({
	render: function() {
		return (
			<div className="results-container flex-row flex">
				<SetTile />
			</div>
		);
	}
});


module.exports = ResultsContainer