import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var Favorites = React.createClass({

	componentDidMount() {
		mixpanel.track("Favorites Page Open");
	},

	render() {
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
		var favorites = user.favorite_sets;

		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer
					sets={favorites}
					push={this.props.push}
					loginStatus={loginStatus}
					user={user}
				/>
			</Loader>
		);
	}

});

export default Favorites