import React from 'react';

var LinkButtonContainer = React.createClass({

	displayName: 'LinkButtonContainer',
	getDefaultProps: function() {
		return {
			links: []
		};
	},
	render: function() {
		var links = this.props.links;

		for(var i in links) {
			if(typeof links[i].url == 'undefined') {
				var hidden = 'hidden';
			} else {
				var hidden = '';
			}
		}

		var icons = links.map(function(link, index) {
			var classString = "fa fa-fw fa-2x click fa-" + link.type;
			if(!!link.url) {
				return (
					<a className='flex' href={link.url} key={index}>
						<i className={classString}/>
					</a>
				);
			}
		});

		var classString = 'flex-row links-container ' + hidden;

		return (
			<div className={classString}>{icons}</div>
		);
	}

});

module.exports = LinkButtonContainer;