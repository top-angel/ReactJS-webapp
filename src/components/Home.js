import React from 'react';
import Base from './Base';
import HomeSidebar from './HomeSidebar';
import LoginOverlay from './LoginOverlay';

export default class Home extends Base {
	constructor(props) {
		super(props)
		this.autoBind('showOverlay')
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Home' })
	}
	componentDidMount() {
		mixpanel.track("User Home Page Open");
	}
	showOverlay(loginStatus) {
		if(!loginStatus) {
			return <LoginOverlay />
		}
	}
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
}

Home.contextTypes =  {
	push: React.PropTypes.func,
	user: React.PropTypes.object,
	loginStatus: React.PropTypes.bool
}