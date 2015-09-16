import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

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

//UNHIDE when mix API route is fixed
	// getMixData: function() {
	// 	var _this = this;
	// 	var push = this.props.push;
	// 	var mix = this.props.params.mix;
	// 	var query = mix.split('-').join('%20');

	// 	var mixData,
	// 		mixUrl = constants.API_ROOT + 'mix/search/' + query;

	// 	$.ajax({
	// 		url: mixUrl,
	// 		type: 'get',
	// 	})
	// 	.done(function(response) {
	// 		mixData = response.payload.mix;
	// 		console.log(mixData);

	// 		push({
	// 			type: 'SHALLOW_MERGE',
	// 			data: {
	// 				detailId: mixData.id,
	// 				detailData: mixData
	// 			}
	// 		});

	// 		_this.setState({
	// 			loaded: true
	// 		});
	// 	});
	// 

	getMixData: function() {
		var _this = this;
		var push = this.props.push;
		var mix = this.props.params.mix;

		var mixData,
			mixUrl = constants.API_ROOT + 'mix/id/' + mix;

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
		var appState = this.props.appState;
		var data = appState.get('detailData');
		var push = this.props.push;

		var detailInfo = {
			appState: appState,
			push: push,
			title: data.event,
			buttonText: 'Shuffle',
			imageURL: data.imageURL,
			info: data.sets.length+' sets'
		};
		
		var setProps = {
			sets: data.sets,
			push: push
		};

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='view detail-page'>
					<DetailImageContainer {...detailInfo}/>
					<div className='divider'/>
					<div className="flex-row links-container">
						<div className='center flex-fixed'>
							sets
						</div>
					</div>
					<SetContainer {...setProps} />
				</div>
			</Loader>
		);
	}

});

module.exports = MixDetail;