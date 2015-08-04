var React = require('react');

var LinkButtonContainer = React.createClass({

	render: function() {
		var linkItems = [];
		this.props.links.map(function(link) {
			linkItems.push(<a url={links.url}><i className={'fa fa-fw fa-2x click fa-'+{link.type}}></i></a>)

		})
		return (
			<div className="flex-row links-container">{linkItems}</div>
		);
	}

});

module.exports = LinkButtonContainer;