import React from 'react';
import DetailView from './DetailView';

var FestivalDetail = React.createClass({
	displayName: 'FestivalDetail',
	componentWillMount: function() {
		var _this = this;
		_this.getFestivalData();
	},
	getFestivalData: function() {
		var push = this.props.push;
		var festivalId = this.props.appState.get('detailId');
		var festivalData,
			festivalUrl = constants.API_ROOT + 'festival/' + festivalId;

		//TODO find out the link to get a single festival
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
		var data = this.props.appState.get('detailData');
		var navTitles = ['sets'];
		var info = data.set_count + ' sets';
		var title = data.event;
		return (
			<DetailView
				data={data}
				navTitles={navTitles}
				info={info}
				title={title}/>
		);
	}
});

module.exports = FestivalDetail;