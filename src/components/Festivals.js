import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';

import FestivalTile from './FestivalTile';

var TITLE = 'Festivals';
var TYPE = 'event';

var Festivals = React.createClass({

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getFestivals();
	},

	componentDidMount() {
		mixpanel.track("Festivals Page Open");
	},

	getFestivals() {
		var push = this.props.push;
		var results,
			festivalUrl = `https://setmine.com/api/v/8/festival`

		$.ajax({
			url: festivalUrl,
			type: 'get'
		})
		.done(res => {
			if(res.status === 'success') {
				results = res.payload.festival;
				
				push({
					type: 'SHALLOW_MERGE',
					data: {
						festivalBrowseData: results
					}
				});

				this.setState({
					loaded: true
				});
			}
		});
	},

	render() {
		var festivals = this.props.appState.get('festivalBrowseData');
		var push = this.props.push;

		var tiles = festivals.map((festival, index) => {
			var props = {
				push: push,
				key: index,
				id: festival.id,
				main_imageURL: festival.main_imageURL,
				set_count: festival.set_count,
				event: festival.event,
				start_date: festival.start_date
			};

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

module.exports = Festivals;