import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import R from 'ramda';

import MixTile from './MixTile';

var Mixes = React.createClass({

	getInitialState() {
		return {
			loaded: false,
			page: 1,
			mixes: []
		};
	},

	componentWillMount() {
		this.getMixes();
	},

	componentDidMount() {
		mixpanel.track("Mixes Page Open");
	},

	getMixes(page=1) {
		$.ajax({
			url: `${API_ROOT}mixes`,
			type: 'get',
			data: {
				page: page
			}
		})
		.done(res => {
			if(res.status === 'success') {
				var {items, currentpage, base, isFirstPage, isLastPage, next, prev, total, limit} = res.payload.page
				var mixes = R.concat(this.state.mixes, res.payload.mixes)

				this.setState({
					loaded: true,
					mixes: mixes,
					items: items,
					currentpage: currentpage,
					base: base,
					isFirstPage: isFirstPage,
					isLastPage: isLastPage,
					next: next,
					prev: prev,
					total: total,
					limit: limit,
					page: page+1
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
				imageURL: mix.icon_image.imageURL_small
			};

			return <MixTile {...props} />
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div className='flex-row scrollable tile-container' style={{position:'relative'}}>
					{tiles} 
				</div>
			</Loader>
		);
	}

});

export default Mixes