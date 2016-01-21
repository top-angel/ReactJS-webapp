import React from 'react';
import HomeSidebar from './HomeSidebar';
import LoginOverlay from './LoginOverlay';

const Home = React.createClass({

	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object,
		loginStatus: React.PropTypes.bool
	},

	componentDidMount() {
		mixpanel.track("User Home Page Open");
	},

	showOverlay(loginStatus) {
		if(!loginStatus) {
			return <LoginOverlay />
		}
	},

	render() {
		return (
			<div id='HomeView' className='flex-row'>
				{this.showOverlay(this.context.loginStatus)}
				<HomeSidebar user={this.context.user} />
				{
					React.cloneElement(this.props.children, {
						className: 'flex-row flex-fixed-4x tile-container',
						appState: this.props.appState
					})
				}
			</div>
		);
	}

});


export default Home;