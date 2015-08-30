import React from 'react';

var LinkButtonContainer = React.createClass({
	render: function() {
		// //TODO don't add icons if they are undefined
		var links = this.props.links;
		var icons = links.map(function(link, index) {
			var classString = "fa fa-fw fa-2x click fa-" + link.type;
			return (<a className='flex' href={link.url} ><i className={classString}/></a>);
		});
		return (
			<div className="flex-row links-container">{icons}</div>
		);
	}

});

module.exports = LinkButtonContainer;