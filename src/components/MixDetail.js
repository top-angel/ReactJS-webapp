import React from 'react';
import Loader from 'react-loader';
import DetailView from './DetailView';
import constants from '../constants/constants';

var MixDetail = React.createClass({

	displayName: 'MixDetail',
	getInitialState: function() {
		return {
			loaded: false
		};
	},
	componentWillMount: function() {
		this.getMixData();
	},
	getMixData: function() {
		var _this = this;
		var push = this.props.push;
		var mixId = this.props.appState.get('detailId');
		var mixData,
			mixUrl = constants.API_ROOT + 'mix/id/' + mixId;

		$.ajax({
			url: mixUrl,
			type: 'get',
		})
		.done(function(response) {
			mixData = response.payload.mix;
			console.log(mixData);

			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: mixData.id,
					detailData: mixData
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},
	render: function() {
		var data = this.props.appState.get('detailData');
		var push = this.props.push;
		var navTitles = [
			{
				title: 'sets',
				to: 'mix-sets'
			}
		];
		var info = data.sets.length + ' sets';
		var title = data.event;

		return (
			<Loader loaded={this.state.loaded}>
				<DetailView
					push={push}
					data={data}
					navTitles={navTitles}
					info={info}
					title={title} />
			</Loader>
		);
	}

});

module.exports = MixDetail;