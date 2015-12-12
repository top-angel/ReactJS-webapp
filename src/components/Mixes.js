import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import R from 'ramda';

import MixTile from './MixTile';

var Mixes = React.createClass({

	getInitialState() {
		return {
			loaded: false,
		};
	},

	componentWillMount() {
		this.getMixes();
	},

	componentDidMount() {
		mixpanel.track("Mixes Page Open");
	},

	getMixes() {
		$.ajax({
			url: `${API_ROOT}mixes`,
			type: 'get',
			data: {
				limit: 5000
			}
		})
		.done(res => {
			if(res.status === 'success') {
				this.setState({
					loaded: true,
					mixes: res.payload.mixes
				});
			}
		});
	},

	render() {
		var tiles = this.state.mixes.map((mix, index) => {
			var props = {
				key: index,
				id: mix.id,
				push: this.props.push,
				event: mix.event,
				icon_image: mix.icon_image.imageURL_small
			};

			return <MixTile {...props} />
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div className='flex-row scrollable tile-container'>
					{tiles} 
				</div>
			</Loader>
		);
	}

});

export default Mixes