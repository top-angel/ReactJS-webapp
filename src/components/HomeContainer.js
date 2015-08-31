import React from 'react';
import {State} from 'react-router';

import NewSets from './NewSets';
import NewEvents from './NewEvents';
import Favorites from './Favorites';

var HomeContainer = React.createClass({

	mixins: [State],
	render: function() {
		var name = this.getParams().name;
		console.log(name);
		return (
			<div className='flex-row flex-fixed-3x results-container'>
				{name}
			</div>
		);
	}

});

module.exports = HomeContainer;