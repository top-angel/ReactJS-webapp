import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import MixTile from './MixTile';

var TITLE = 'Mixes';
var TYPE = 'mix';

var Mixes = React.createClass({

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getMixes();
	},

	componentDidMount() {
		mixpanel.track("Mixes Page Open");
	},

	getMixes() {
		var push = this.props.push;
		var results,
			mixUrl = `${API_ROOT}mixes`;

		$.ajax({
			url: mixUrl,
			type: 'get'
		})
		.done(res => {
			if(res.status === 'success') {
				results = res.payload.mixes;
				push({
					type: 'SHALLOW_MERGE',
					data: {
						mixBrowseData: results
					}
				});

				this.setState({
					loaded: true
				});
			}
		});
	},

	render() {
		var push = this.props.push;
		var mixes = this.props.appState.get('mixBrowseData');

		var tiles = mixes.map((mix, index) => {
			var props = {
				key: index,
				id: mix.id,
				push: push,
				event: mix.event,
				imageURL: mix.icon_image.imageURL_small
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

module.exports = Mixes;