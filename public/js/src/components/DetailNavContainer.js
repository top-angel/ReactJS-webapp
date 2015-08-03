var React = require('react');

var DetailNavContainer = React.createClass({

	render: function() {
		var titles = []
		this.props.navTitles.map(function(navTitle) {
			titles.push(<DetailNavButton title={navTitle} />)
		})
		return (
			<div className="flex-row links-container">{titles}</div>
		);
	}
		
});

module.exports = DetailNavContainer;