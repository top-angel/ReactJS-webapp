import React, {PropTypes} from 'react';
import Base from './Base';

const {number, string, func} = PropTypes;

export default class SearchTab extends Base {
	constructor(props) {
		super(props);
		this.autoBind('handleClick');
	}
	handleClick(e) {
		this.props.onClick(null, e, this); // changes inkbar position
		this.props.onSelect(null, e, this); // scrolls to position
	}
	render() {
		let { width, children } = this.props;
		return (
			<a onClick={this.handleClick} style={{ width: width+'%'}}>
				<p>{children}</p>
			</a>
		);
	}
}

SearchTab.propTypes = {
	width: number,
	children: string,
	onClick: func
};