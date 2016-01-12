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
		$.ajax({
			url: `${API_ROOT}events/festivals`,
			type: 'get'
		}).done(res => {
			if(res.status === 'success') {
				this.setState({
					loaded: true,
					festivals: res.payload.events_festivals.festivals
				});
			}
		});
	},

	render() {
		var festivalTiles = this.state.festivals.map((festival, index) => {
			return React.createElement(FestivalTile, {
				key: index,
				id: festival.id,
				festival: festival.event,
				bannerImage: festival.banner_image.imageURL,
				setCount: festival.set_count,
				formattedDate: festival.formatted_date
			})
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div className='flex-row scrollable tile-container'>
					{festivalTiles}
				</div>
			</Loader>
		);
	}

});

export default Festivals