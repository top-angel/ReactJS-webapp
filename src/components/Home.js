import React from 'react';
import HomeSidebar from './HomeSidebar';
import LoginOverlay from './LoginOverlay';

const Home = React.createClass({

	componentDidMount() {
		mixpanel.track("User Home Page Open");
	},

	showOverlay(loginStatus) {
		if(!loginStatus) {
			return <LoginOverlay push={this.props.push} />
		}
	},

	render() {
		var className = 'flex-row flex-fixed-4x tile-container';
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');

		return (
			<div id='HomeView' className='flex-row'>
				{this.showOverlay(loginStatus)}
				<HomeSidebar user={user} />
				{
					React.cloneElement(this.props.children, {
						push: this.props.push,
						className: className,
						appState: this.props.appState
					})
				}
			</div>
		);
	}

});


export default Home;