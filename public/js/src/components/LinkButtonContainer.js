var React = require('react');
var LinkButton = require('./LinkButton');

var LinkButtonContainer = React.createClass({

	render: function() {
		var linkItems = []
		for(var i in this.props.links) {

		}
		this.props.links.map(function(link) {
			linkItems.push(<LinkButton type={link.type} url={link.url}/>)
		})
		return (
			<div className="flex-row links-container">{linkItems}</div>
		);
	}

});

module.exports = LinkButtonContainer;