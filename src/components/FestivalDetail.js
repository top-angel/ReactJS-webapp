import React from 'react';
import R from 'ramda';
import constants from '../constants/constants';
import Loader from 'react-loader';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

var FestivalDetail = React.createClass({

	displayName: 'FestivalDetail',
	getInitialState: function() {
		return {
			loaded: false
		};
	},

	componentWillMount: function() {
		this.getFestivalData();
	},

	getFestivalData: function() {
		var _this = this;
		var push = this.props.push;
		var festival = this.props.params.festival;
		var query = festival.split('-').join('%20');

		var festivalData,
			festivalUrl = constants.API_ROOT + 'festival/search/' + query;

		$.ajax({
			url: festivalUrl,
			type: 'get',
		})
		.done(function(response) {
			festivalData = response.payload.festival;

			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: festivalData.id,
					detailData: festivalData
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},

	render: function() {
		var appState = this.props.appState;
		var push = this.props.push;

		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
		var data = this.props.appState.get('detailData');

		var detailInfo = {
			appState: appState,
			push: push,
			title: data.event,
			buttonText: 'Shuffle',
			imageURL: data.imageURL,
			info: data.set_count+' sets'
		};

		var setProps = {
			containerClass: 'flex-row flex',
			sets: data.sets,
			push: push,
			loginStatus: loginStatus,
			user: user
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

module.exports = FestivalDetail;