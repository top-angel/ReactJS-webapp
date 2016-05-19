import React, {PropTypes} from 'react';
import Base from './Base';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';
import Ink from 'react-ink';

const {number, element, func, any, string, bool, object} = PropTypes;

export default class Tab extends Base {
	static propTypes = {
		to: string,
		width: number,
		children: any.isRequired,
		onClick: func, // inherited from Tabs
		disabled: bool,
		disabledText: string,
		index: bool
	}
	static contextTypes = {
		loginStatus: bool
	}
	static defaultProps = {
		index: false
	}
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
		const { width, children, to, disabled, disabledText, index } = this.props;
		let style = { width: width.toString() + '%'};

		if(disabled) {
			return <div className='Tab--disabled' title={disabledText}><p>{children}</p></div>
		}

		// FIXME active className isn't applying to artist detail tabs
		if(index) {
			return (
				<IndexLink
					className='Tab'
					activeClassName='Tab--active'
					to={to}
					onClick={this.handleClick}
					style={style}
				>
					<p>{children.toUpperCase()}</p>
				</IndexLink>
			);
		}
		return (
			<Link
				className='Tab'
				activeClassName='Tab--active'
				to={to} 
				onClick={this.handleClick} 
				style={style}
			>
				<p>{children}</p>
			</Link>
		);
	}
	render() {
		return this.renderTab();
	}
}