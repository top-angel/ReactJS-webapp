import React from 'react';
import DetailView from './DetailView';
import constants from '../constants/constants';

var MixDetail = React.createClass({
	displayName: 'MixDetail',
	componentWillMount: function() {
		var _this = this;
		_this.getMixData();
	},
	getMixData: function() {
		var push = this.props.push;
		var mixId = this.props.appState.get('detailId');
		var mixData,
			mixUrl = constants.API_ROOT + 'mix/' + mixId;

		//TODO find out the link to get a single Mix
		$.ajax({
			url: mixUrl,
			type: 'get',
		})
		.done(function(response) {
			mixData = response.payload.Mix;
			console.log(mixData);
			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: mixData.id,
					detailData: mixData
				}
			});
		});
	},
	render: function() {
		var data = this.props.appState.get('detailData');
		var push = this.props.push;
		var navTitles = ['sets'];
		var info = data.set_count + ' sets';
		var title = data.event;
		return (
			<DetailView
				push={push}
				data={data}
				navTitles={navTitles}
				info={info}
				title={title}/>
		);
	}
});

module.exports = MixDetail;