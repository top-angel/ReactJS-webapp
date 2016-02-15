import React from 'react';
import Base from './Base';
import LoginOverlay from './LoginOverlay';
import Tabs from './Tabs';
import Tab from './Tab';

export default class Home extends Base {
	constructor(props) {
		super(props);
		this.state = {
			favoritesDisabled: true
		}
	}
	componentWillMount() {
		const { push, loginStatus } = this.context;
		push({ currentPage: 'Home' });
		if(loginStatus) {
			this.setState({ favoritesDisabled: false });
		}
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextContext.loginStatus) {
			this.setState({
				favoritesDisabled: false 
			});
		}
	}
	componentDidMount() {
		// mixpanel.track("User Home Page Open");
	}
	render() {
		let disabledText = 'Log in to start favoriting sets!';
		return (
			<div className='view'>
				<Tabs>
					<Tab to='/home'>STREAM</Tab>
					<Tab to='/home/favorites' disabled={this.state.favoritesDisabled} disabledText={disabledText}>FAVORITES</Tab>
				</Tabs>
				{
					React.cloneElement(this.props.children, {
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
};