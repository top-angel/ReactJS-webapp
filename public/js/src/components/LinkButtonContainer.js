var React = require('react');

var LinkButtonContainer = React.createClass({
	render: function() {
		var linkItems = [];
		this.props.links.map(function(link) {
			var classString = "fa fa-fw fa-2x clic fa-" + link.type
			linkItems.push(<a url={links.url}><i className={classString}></i></a>)
		})
		return (
			<div className="flex-row links-container">{linkItems}</div>
		);
	}

});

module.exports = LinkButtonContainer;