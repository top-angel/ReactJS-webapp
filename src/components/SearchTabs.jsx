import React, {PropTypes} from 'react';
import {Motion, spring} from 'react-motion';
import Base from './Base';
import InkBar from './InkBar';

export default class SearchTabs extends Base {
	constructor(props, context) {
		super(props, context);
		this.state = {
			activeIndex: 0 
		};
	}
	getTabCount() {
		return React.Children.count(this.props.children);
	}
	handleClick(value, e, tab) {
		console.log('value', value);
		console.log('e', e);
		console.log('tab', tab);
	}
	renderTabs() {
		// may not be needed
		let width = 100 / this.getTabCount() + '%';
		let tabs = React.Children.map(this.props.children, (tab, index) => {
			console.log(tab);
			return React.cloneElement(tab, {
				key: index,
				onClick: this.handleClick,
				width: width
			}, tab.props.children);
		});

		return tabs;
	}
	render() {
		let width = ((window.innerWidth - 64) / window.innerWidth) * 100 + '%';
		return (
			<nav id='SearchTabs' className='flex-row' style={{ width: width }}>
				{this.renderTabs()}
				<InkBar />
			</nav>
		);
	}
}