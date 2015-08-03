var React = require('react')
var ViewTitleContainer = require('./ViewTitleContainer')
var ResultsContainer = require('./ResultsContainer')

var BrowseView = React.createClass({
	render: function() {
		return (
			<div id="browse" className="view overlay-container hidden">
				<ViewTitleContainer type={this.props.type} />
				<ResultsContainer results={this.props.results} />
			</div>
		)
	}
})

module.exports = BrowseView