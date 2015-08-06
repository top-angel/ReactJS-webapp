var React = require('react');

var LinkButtonContainer = React.createClass({
	render: function() {
		var linkItems = [];
		this.props.links.map(function(link) {
			if(link.type) {
				link.type=='web' ? link.type='globe' : null;
				var classString = "fa fa-fw fa-2x click fa-" + link.type;
				linkItems.push(<a className='flex' href={link.url}><i className={classString}></i></a>)
			}
		});
		return (
			<div className="flex-row links-container">{linkItems}</div>
		);
	}

});

module.exports = LinkButtonContainer;