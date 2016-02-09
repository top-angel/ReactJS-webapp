import React from 'react';
import Base from './Base';
import HomeSidebar from './HomeSidebar';
import LoginOverlay from './LoginOverlay';
import Tabs from './Tabs';

const tabs = [
	{
		text: 'FAVORITES',
		to: '/home',
		index: true
	}
];

export default class Home extends Base {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Home' });
	}
	componentDidMount() {
		mixpanel.track("User Home Page Open");
	}
	render() {
		return (
			<div className='view'>
				<Tabs tabs={tabs} />
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