import React, {PropTypes} from 'react';
import {Motion, spring, presets} from 'react-motion';
import Base from './Base';
import InkBar from './InkBar';

export default class SearchTabs extends Base {
	constructor(props, context) {
		super(props, context);
		this.autoBind('getTabWidth', 'handleClick');
		this.state = {
			activeIndex: 0,
			left: 0
		};
	}
	componentWillReceiveProps(nextProps) {
		console.log(this.props.selectedIndex);
		console.log(nextProps.selectedIndex);
		let left = nextProps.selectedIndex * this.getTabWidth();
		this.setState({ left: left });
	}
	getTabWidth() {
		let count = React.Children.count(this.props.children);
		let width = 100 / count;
		return width;
	}
	handleClick(value, e, tab) {
		let newLeft = (this.getTabWidth() * tab.props.tabIndex);
		this.setState({ left: newLeft });

		if(this.props.onSelect) {
			this.props.onSelect(value, e, tab);
		}
	}
	renderTabs() {
		let tabs = React.Children.map(this.props.children, (tab, index) => {
			return React.cloneElement(tab, {
				key: index,
				onClick: this.handleClick,
				width: this.getTabWidth(),
				tabIndex: index
			}, tab.props.children);
		});

		return tabs;
	}
	render() {
		let containerWidth = ((window.innerWidth - 64) / window.innerWidth) * 100 + '%';
		let inkbarWidth = this.getTabWidth() + '%';
		console.log(inkbarWidth);

		return (
			<nav id='SearchTabs' className='flex-row' style={{ width: containerWidth }}>
				{this.renderTabs()}
				<Motion style={{ left: spring(this.state.left, presets.gentle) }} >
					{
						({left}) => (
							<InkBar width={inkbarWidth} animation={left}/>
						)
					}
				</Motion>
			</nav>
		);
	}
}

SearchTabs.propTypes = {
	onSelect: PropTypes.func,
	children: PropTypes.element.isRequired
};