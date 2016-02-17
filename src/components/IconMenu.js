import React, {PropTypes} from 'react';
import Base from './Base';
import {Motion, spring, presets} from 'react-motion';
import Dropdown from './Dropdown';

const {element} = PropTypes;

export default class IconMenu extends Base {
	constructor(props) {
		super(props);
		this.autoBind('toggleDropdown', 'renderIcon', 'renderChildren');
		this.state = {
			open: false
		}
	}
	componentDidMount() {
		window.addEventListener('click', () => {
			this.setState({ open: false });
		});
	}
	toggleDropdown(e) {
		console.log('toggleDropdown', e);
		e.stopPropagation();
		this.setState({ open: !this.state.open });
	}
	renderIcon() {
		return React.cloneElement(this.props.icon, {
			onClick: this.toggleDropdown
		});
	}
	renderChildren() {
		return React.Children.map(this.props.children, (child, index) => {
			return React.cloneElement(child, {
				key: index,
				onClick: this.toggleDropdown
			})
		})
	}
	render() {
		let transform = this.state.open ? 1 : 0;
		let motionStyle = {
			t: spring(transform, {stiffness: 192, damping: 18, precision: 0.1})
		};

		return (
			<div className='IconMenu'>
				{this.renderIcon()}
				<Motion style={motionStyle}>
					{
						({t}) =>
						<Dropdown style={{
							transform: `scale(${t})`,
							MozTransform: `scale(${t})`,
							msTransform: `scale(${t})`,
							OTransform: `scale(${t})`,
							WebkitTransform: `scale(${t})`,
							transformOrigin: 'top right'
						}}>
							{this.renderChildren()}
						</Dropdown>
					}
				</Motion>
			</div>
		);
	}
}

IconMenu.propTypes = {
	icon: element.isRequired
};
