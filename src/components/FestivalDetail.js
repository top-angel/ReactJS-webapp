import React from 'react';
import R from 'ramda';
import {API_ROOT} from '../constants/constants';
import Loader from 'react-loader';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

var FestivalDetail = React.createClass({

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getFestivalData();
	},

	getFestivalData() {
		var push = this.props.push;
		var festival = this.props.params.festival;
		var query = festival.split('-').join('%20');

		var festivalData,
			festivalUrl = API_ROOT + 'festival/search/' + query;

		$.ajax({
			url: festivalUrl,
			type: 'get',
		})
		.done(res => {
			festivalData = res.payload.events.events_id;

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

	render() {
		var appState = this.props.appState;
		var push = this.props.push;

		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
		var data = this.props.appState.get('detailData');

		var setText = data.set_count > 1 ? ' sets' : ' set';

		var detailInfo = {
			appState: appState,
			push: push,
			title: data.event,
			buttonText: 'Shuffle',
			imageURL: data.main_imageURL,
			info: data.set_count + setText
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
					<div className="flex-row links-container">
						<div className='center flex-fixed'>
							SETS
						</div>
					</div>
					<SetContainer {...setProps} />
				</div>
			</Loader>
		);
	}
});

module.exports = FestivalDetail;