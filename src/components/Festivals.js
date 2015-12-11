import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';

import FestivalTile from './FestivalTile';

var Festivals = React.createClass({

	getInitialState() {
		return {
			loaded: false,
			festivals: []
		};
	},

	componentWillMount() {
		this.getFestivals();
	},

	componentDidMount() {
		mixpanel.track("Festivals Page Open");
	},

	getFestivals() {
		var push = this.props.push
		var url = `https://setmine.com/api/v/8/festival`;
		// var url = `${API_ROOT}events/festivals`;

		$.ajax({
			url: url,
			type: 'get'
		})
		.done(res => {
			if(res.status === 'success') {
				var festivals = res.payload.festival;
				
				// push({
				// 	type: 'SHALLOW_MERGE',
				// 	data: {
				// 		festivalBrowseData: festivals
				// 	}
				// });

				this.setState({
					loaded: true,
					festivals: festivals
				});
			}
		});
	},

	render() {
		var tiles = this.state.festivals.map((festival, index) => {
			var props = {
				push: this.props.push,
				key: index,
				id: festival.id,
				main_imageURL: festival.main_imageURL,
				set_count: festival.set_count,
				event: festival.event,
				start_date: festival.start_date
			}

			return <FestivalTile {...props} />
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

export default Festivals