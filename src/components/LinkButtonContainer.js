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
			var classString = "fa fa-fw fa-2x center click fa-" + link.type;
			if(!!link.url) {
				return (
					<a className='flex set-flex' onClick={trackMixpanel} href={link.url} key={index}>
						<i className={classString}/>
					</a>
				);
			}
		});

		var hideContainer = 'flex-row links-container ' + hidden;

		return (
			<div className={hideContainer}>{icons}</div>
		);
	}

});

module.exports = LinkButtonContainer;