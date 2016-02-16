import React, {PropTypes} from 'react';
import {Motion, spring, presets} from 'react-motion';
import Base from './Base';
import InkBar from './InkBar';

let fixedTabs = {
	width: ((window.innerWidth - 64) / window.innerWidth) * 100 + '%'
};

export default class Tabs extends Base {
	constructor(props, context) {
		super(props, context);
		this.autoBind('getTabWidth', 'handleClick', 'renderTabs');
		this.state = {
			left: 0
		};
	}
	componentWillReceiveProps(nextProps) {
		// change position of inkbar while scrolling
		if(nextProps.selectedIndex) {
			let left = nextProps.selectedIndex * this.getTabWidth();
			this.setState({ left: left });
		}
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
		return React.Children.map(this.props.children, (tab, index) => {
			return React.cloneElement(tab, {
				key: index,
				onClick: this.handleClick,
				width: this.getTabWidth(),
				tabIndex: index,
				activeClassName: 'active'
			}, tab.props.children);
		});
	}
	render() {
		const inkbarWidth = this.getTabWidth() + '%';
		const style = this.props.type == 'detail' ? {} : fixedTabs;
		let mergedStyle = Object.assign({}, style, this.props.style);

		return (
			<nav id='Tabs' className='flex-row' style={mergedStyle}>
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

const {func, number, arrayOf, element, object, oneOf} = PropTypes;

Tabs.propTypes = {
	onSelect: func, // callback when tab is selected ie. scroll to position
	selectedIndex: number, // override slider position from scroll
	children: arrayOf(element).isRequired,
	style: object,
	type: oneOf(['detail', 'search'])
};