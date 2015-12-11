import React from 'react';
import R from 'ramda';
import {API_ROOT} from '../constants/constants';
import Loader from 'react-loader';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

var FestivalDetail = React.createClass({

	getInitialState() {
		return {
			loaded: false,
			festival: {
				banner_image: {
					imageURL: null
				}
			}
		};
	},

	componentWillMount() {
		this.getFestivalData();
	},

	getFestivalData() {
		var push = this.props.push;
		var festivalUrl = `${API_ROOT}events/id/${this.props.params.festival}`

		$.ajax({
			url: festivalUrl,
			type: 'get',
		}).done(res => {
			// push({
			// 	type: 'SHALLOW_MERGE',
			// 	data: {
			// 		defailData: res.payload.events_id
			// 	}
			// });

			this.setState({
				loaded: true,
				festival: res.payload.events_id
			});
		});
	},

	render() {
		// var appState = this.props.appState;
		// var push = this.props.push;

		var { appState, push } = this.props

		var loginStatus = appState.get('isUserLoggedIn');
		var user = appState.get('user');
		// var festival = appState.get('festival');

		var festival = this.state.festival


		var setText = festival.set_count != 1 ? 'sets' : 'set';
		var festivalInfo = `${festival.set_count} ${setText}`;

		var detailInfo = {
			push: push,
			title: festival.event,
			info: festivalInfo,
			imageURL: festival.banner_image.imageURL
		};

		var sets = {
			containerClass: 'flex-row flex',
			sets: festival.sets,
			push: push,
			loginStatus: loginStatus,
			user: user
		};

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='view detail-page'>
					<DetailImageContainer {...detailInfo}/>
					<div className='flex-row links-container'>
						<div className='center flex-fixed'>
							SETS
						</div>
					</div>
					<SetContainer {...sets} />
				</div>
			</Loader>
		);
	}
});

module.exports = FestivalDetail;