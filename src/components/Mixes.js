import React from 'react';
import Loader from 'react-loader';
import api from '../services/api';

import MixTile from './MixTile';

var Mixes = React.createClass({

	getInitialState() {
		return {
			loaded: false,
			mixes: []
		};
	},

	componentWillMount() {
		this.getMixes();
	},

	componentDidMount() {
		mixpanel.track("Mixes Page Open");
	},

	getMixes() {
		// $.ajax({
		// 	url: `${API_ROOT}mixes`,
		// 	type: 'get',
		// 	data: {
		// 		limit: 5000
		// 	}
		// }).done(res => {
		// 	if(res.status === 'success') {
		// 		this.setState({
		// 			loaded: true,
		// 			mixes: res.payload.mixes
		// 		});
		// 	}
		// });
		api.get('mixes?limit=5000').then(res => {
			this.setState({
				loaded: true,
				mixes: res.mixes
			});
		})
	},

	render() {
		var mixTiles = this.state.mixes.map((mix, index) => {
			return React.createElement(MixTile, {
				key: index,
				id: mix.id,
				event: mix.event,
				iconImage: mix.icon_image.imageURL_small
			})
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div className='flex-row scrollable tile-container'>
					{mixTiles} 
				</div>
			</Loader>
		);
	}

});

export default Mixes