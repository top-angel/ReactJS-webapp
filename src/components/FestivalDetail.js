import React from 'react';
import DetailView from './DetailView';
import constants from '../constants/constants';

var FestivalDetail = React.createClass({

	displayName: 'FestivalDetail',
	componentWillMount: function() {
		this.getFestivalData();
	},
	getFestivalData: function() {
		var push = this.props.push;
		var festivalId = this.props.appState.get('detailId');

		var festivalData,
			festivalUrl = constants.API_ROOT + 'festival/id/' + festivalId;

		$.ajax({
			url: festivalUrl,
			type: 'get',
		})
		.done(function(response) {
			festivalData = response.payload.festival;
			console.log(festivalData);

			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: festivalData.id,
					detailData: festivalData
				}
			});
		});
	},
	render: function() {
		var appState = this.props.appState;
		var data = appState.get('detailData');
		console.log(data);

		var push = this.props.push;
		var navTitles = [
			{
				title: 'sets',
				to: 'festival-sets'
			}
		];
		var info = data.set_count + ' sets';
		var title = data.event;
		var buttonText = 'Shuffle';

		return (
			<DetailView
				navTitles={navTitles}
				push={push}
				data={data}
				info={info}
				title={title}
				buttonText={buttonText}/>
		);
	}
});

module.exports = FestivalDetail;