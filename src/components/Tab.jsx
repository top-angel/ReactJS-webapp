import React, {PropTypes} from 'react';
import Base from './Base';
import Link from 'react-router/lib/Link';

const {number, element, func, any, string, bool} = PropTypes;
const style = {
	background: '#cfd4d6',
	color: '#bdc3c7'
};

export default class Tab extends Base {
	constructor(props) {
		super(props);
		this.autoBind('handleClick', 'renderTab');
	}
	handleClick(e) {
		if(this.props.onClick) {
			this.props.onClick(null, e, this);
		}
	}
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if(nextContext.loginStatus != this.context.loginStatus) {
			// console.log('user logged in', nextContext.loginStatus);
			return true;
		} else return false;
	}
	renderTab() {
		const { width, children, to, disabled, disabledText } = this.props;
		let disabledStyle = disabled ? style : null;
		let mergedStyle = Object.assign({}, disabledStyle, {width: width+'%'});

		if(disabled) {
			return <div className='tab' style={mergedStyle} title={disabledText}><p>{children}</p></div>
		}

		return (
			<Link to={to} onClick={this.handleClick} style={mergedStyle}>
				<p>{children}</p>
			</Link>
		);
	}
	render() {
		// let { width, children, to, disabled } = this.props;
		// let style = disabled ? {color: '#bdc3c7'} : null;

		// let mergedStyle = Object.assign({}, style, {width: width+'%'});
		// return (
		// 	<Link to={to} onClick={this.handleClick} style={{ width: width+'%'}}>
		// 		<p>{children}</p>
		// 	</Link>
		// );
		return this.renderTab();
	}
}

Tab.contextTypes = {
	loginStatus: bool
};

Tab.propTypes = {
	to: string,
	width: number,
	children: any.isRequired,
	onClick: func, // inherited from Tabs
	disabled: bool,
	disabledText: string
};